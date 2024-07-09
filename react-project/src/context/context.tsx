import { Component, createContext } from "react";

const SearchContext = createContext({});

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
  constructor(props: SearchProviderProps) {
    super(props);
    this.state = {
      identifier: "",
    };
  }

  render() {
    return (
      <SearchContext.Provider value={this.state.identifier}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
