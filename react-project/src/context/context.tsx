import { Component, createContext } from "react";
import { Pokemon, PokemonListApiResponse } from "../types/types";
import API from "../services/api";

interface SearchProviderState {
  data: PokemonListApiResponse | Pokemon | null;
  isLoading: boolean;
  isEmpty: boolean;
  searchInput: string;
}

export interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
  setSearchInput: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  data: null,
  isLoading: false,
  isEmpty: false,
  searchInput: "",
  getPokemon: () => Promise.resolve(),
  setSearchInput: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

class SearchProvider extends Component<
  SearchProviderProps,
  SearchProviderState
> {
  getPokemon = async (value: string) => {
    try {
      this.setState({ isLoading: true });
      const data = value.trim().length
        ? await API.getInstance().getPokemon(value)
        : await API.getInstance().getAllPokemons();
      this.setState({ data, isEmpty: false });
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        this.setState({ isEmpty: true });
        console.error(message);
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setSearchInput = (value: string) => {
    this.setState({ searchInput: value });
  };

  render() {
    const contextValue = {
      getPokemon: this.getPokemon,
      setSearchInput: this.setSearchInput,
      ...this.state,
    };
    return (
      <SearchContext.Provider value={contextValue}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
