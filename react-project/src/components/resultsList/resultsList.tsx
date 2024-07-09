import { Component, ContextType } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";
import { SearchContext } from "../../context/context";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

class ResultsList extends Component<ResultsListProps> {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render() {
    const { searchInput } = this.context;
    const { results } = this.props.data;
    const listItems = results
      .map((item) => {
        const { name, url } = item;
        const id = url.split("/").slice(-2, -1)[0];
        return (
          <tr key={name + id}>
            <td>{id}</td>
            <td>{name}</td>
          </tr>
        );
      })
      .filter(
        (item) =>
          !searchInput?.length || (item.key && item.key.includes(searchInput))
      );
    return (
      <>
        <table className="results__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </>
    );
  }
}

export default ResultsList;
