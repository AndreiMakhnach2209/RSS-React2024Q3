import { Component } from "react";
import "./resultsList.scss";
import { PokemonListApiResponse } from "../../types/types";

interface ResultsListProps {
  data: PokemonListApiResponse;
}

class ResultsList extends Component<ResultsListProps> {
  render() {
    const { results } = this.props.data;
    const listItems = results.map((item) => {
      const { name, url } = item;
      const id = url.split("/").slice(-2, -1)[0];
      return (
        <tr key={name}>
          <td>{id}</td>
          <td>{name}</td>
        </tr>
      );
    });
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
