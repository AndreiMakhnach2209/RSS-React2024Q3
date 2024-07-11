import {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Pokemon, PokemonListApiResponse } from "../types/types";
import API from "../services/api";

interface SearchProviderState {
  data: PokemonListApiResponse | Pokemon | null;
  isLoading: boolean;
  isEmpty: boolean;
  searchInput: string;
}

interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
  setSearchInput: (value: string) => void;
}

const initialSearchState: SearchProviderState = {
  data: null,
  isLoading: false,
  isEmpty: false,
  searchInput: "",
};

export const SearchContext = createContext<SearchContextType>({
  ...initialSearchState,
  getPokemon: () => Promise.resolve(),
  setSearchInput: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

function SearchProvider(props: SearchProviderProps): ReactElement {
  const [state, setState] = useState<SearchProviderState>(initialSearchState);

  const getPokemon = useCallback(async (value: string): Promise<void> => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const data = value.trim().length
        ? await API.getInstance().getPokemon(value)
        : await API.getInstance().getAllPokemons();
      setState((prevState) => ({ ...prevState, data, isEmpty: false }));
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        setState((prevState) => ({ ...prevState, isEmpty: true }));
        console.error(message);
      }
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  const setSearchInput = useCallback((value: string): void => {
    setState((prevState) => ({ ...prevState, searchInput: value }));
  }, []);

  const contextValue: SearchContextType = useMemo(
    () => ({
      ...state,
      getPokemon,
      setSearchInput,
    }),
    [getPokemon, setSearchInput, state]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
