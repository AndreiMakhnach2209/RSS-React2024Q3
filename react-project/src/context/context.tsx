import { Component, createContext } from "react";

export interface SearchContextType {
  identifier: string;
  setIdentifier: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  identifier: "",
  setIdentifier: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

interface SearchProviderState {
  identifier: string;
}

class SearchProvider extends Component<
  SearchProviderProps,
  SearchProviderState
> {
  setIdentifier = (value: string) => {
    this.setState({ identifier: value });
  };

  render() {
    const contextValue = {
      setIdentifier: this.setIdentifier,
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
