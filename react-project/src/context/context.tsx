import { Component, createContext } from "react";
import { Pokemon, PokemonListApiResponse } from "../types/types";
import API from "../services/api";

interface SearchProviderState {
  data: PokemonListApiResponse | Pokemon | null;
  isLoading: boolean;
}

export interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
}

export const SearchContext = createContext<SearchContextType>({
  data: null,
  isLoading: false,
  getPokemon: () => Promise.resolve(),
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
      this.setState({ data });
    } catch (error) {
      console.error("Something went wrong.");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const contextValue = {
      getPokemon: this.getPokemon,
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
