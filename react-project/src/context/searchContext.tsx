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

interface SearchProviderState {
  data: PokemonListApiResponse | Pokemon | null;
  isLoading: boolean;
  isEmpty: boolean;
  searchInput: string;
  count: number;
  fullList: PokemonResult[];
  limit: number;
  offset: number;
}

interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
  setSearchInput: (value: string) => void;
  getPage: (to: "next" | "previous") => Promise<void>;
}

const initialSearchState: SearchProviderState = {
  data: null,
  isLoading: false,
  isEmpty: false,
  searchInput: "",
  count: 0,
  fullList: [],
  limit: 20,
  offset: 0,
};

export const SearchContext = createContext<SearchContextType>({
  ...initialSearchState,
  getPokemon: () => Promise.resolve(),
  setSearchInput: () => {},
  getPage: () => Promise.resolve(),
});

interface SearchProviderProps {
  children: React.ReactNode;
}

function SearchProvider(props: SearchProviderProps): ReactElement {
  const [state, setState] = useState<SearchProviderState>(initialSearchState);

  const getPokemon = useCallback(
    async (value: string): Promise<void> => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const data = value.trim().length
          ? await API.getInstance().getPokemon(value)
          : await API.getInstance().getAllPokemons(state.limit, state.offset);
        setState((prevState) => ({
          ...prevState,
          data,
          isEmpty: false,
        }));
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
    [state.limit, state.offset]
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
        const { data, limit, offset } = state;
        if (isPokemonListApiResponse(data) && data[to]) {
          const response = await fetch(data[to]);
          if (response.status === 200) {
            const data = (await response.json()) as PokemonListApiResponse;
            setState((prevState) => ({
              ...prevState,
              data,
              offset: to === "next" ? offset + limit : offset - limit,
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
    [state]
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
    }),
    [getPage, getPokemon, setSearchInput, state]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
