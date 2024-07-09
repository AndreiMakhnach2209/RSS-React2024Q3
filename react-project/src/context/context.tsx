import { Component, createContext } from "react";
import { Pokemon, PokemonListApiResponse } from "../types/types";
import API from "../services/api";

interface SearchProviderState {
  data: PokemonListApiResponse | Pokemon | null;
}

export interface SearchContextType extends SearchProviderState {
  getPokemon: (value: string) => Promise<void>;
}

export const SearchContext = createContext<SearchContextType>({
  data: null,
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
    const data = value.trim().length
      ? await API.getInstance().getPokemon(value)
      : await API.getInstance().getAllPokemons();
    this.setState({ data });
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
