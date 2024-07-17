import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pokemon, PokemonListApiResponse, PokemonResult } from "../types/types";
import API from "../services/api";
import { isPokemonListApiResponse } from "../types/guards";
import { useSearchParams } from "react-router-dom";

interface SearchProviderState {
  data: PokemonListApiResponse | null;
  details: Pokemon | null;
  isLoading: boolean;
  isEmpty: boolean;
  searchInput: string;
  count: number;
  fullList: PokemonResult[];
}

interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
  setSearchInput: (value: string) => void;
  getPage: (to: "next" | "previous") => Promise<void>;
  search: (value: string) => void;
}

const initialSearchState: SearchProviderState = {
  data: null,
  details: null,
  isLoading: false,
  isEmpty: false,
  searchInput: "",
  count: 0,
  fullList: [],
};

export const SearchContext = createContext<SearchContextType>({
  ...initialSearchState,
  getPokemon: () => Promise.resolve(),
  setSearchInput: () => {},
  getPage: () => Promise.resolve(),
  search: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

function SearchProvider(props: SearchProviderProps): ReactElement {
  const [state, setState] = useState<SearchProviderState>(initialSearchState);
  const [searchParams, setSearchParams] = useSearchParams();

  const getPokemon = useCallback(
    async (value: string): Promise<void> => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const limit = searchParams.get("limit");
        const offset = searchParams.get("offset");
        if (value.trim().length) {
          const details = await API.getInstance().getPokemon(value);
          setState((prevState) => ({
            ...prevState,
            details,
            isEmpty: false,
          }));
        } else {
          const data = await API.getInstance().getAllPokemons(
            parseInt(limit || "20"),
            parseInt(offset || "0")
          );
          setState((prevState) => ({
            ...prevState,
            data,
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          const { message } = error;
          console.error(message);
        }
        setState((prevState) => ({ ...prevState, isEmpty: true }));
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    },
    [searchParams]
  );

  const setSearchInput = useCallback((value: string): void => {
    setState((prevState) => ({ ...prevState, searchInput: value }));
  }, []);

  const getfullList = async (): Promise<void> => {
    try {
      const { count } = await API.getInstance().getAllPokemons();
      const { results } = await API.getInstance().getAllPokemons(count);

      setState((prevState) => ({ ...prevState, count, fullList: results }));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const getPage = useCallback(
    async (to: "next" | "previous"): Promise<void> => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const { data } = state;
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");
        if (isPokemonListApiResponse(data) && data[to]) {
          const response = await fetch(data[to]);
          if (response.status === 200) {
            setSearchParams({
              limit: limit.toString(),
              offset: (to === "next"
                ? offset + limit
                : offset - limit
              ).toString(),
            });
            const data = (await response.json()) as PokemonListApiResponse;
            setState((prevState) => ({
              ...prevState,
              data,
              isEmpty: false,
            }));
          }
        } else {
          throw new Error("Something went wrong.");
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, isEmpty: true }));
        if (error instanceof Error) console.error(error.message);
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    },
    [searchParams, setSearchParams, state]
  );

  const search = useCallback(
    (value: string) => {
      const results = state.fullList.filter((item) =>
        item.name.includes(value)
      );
      const newData = {
        count: 0,
        next: null,
        previous: null,
        results,
      } as PokemonListApiResponse;
      if (value) setState((prevState) => ({ ...prevState, data: newData }));
    },
    [state.fullList]
  );

  useEffect(() => {
    getfullList();
  }, []);

  const contextValue: SearchContextType = useMemo(
    () => ({
      ...state,
      getPokemon,
      setSearchInput,
      getPage,
      search,
    }),
    [getPage, getPokemon, search, setSearchInput, state]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
