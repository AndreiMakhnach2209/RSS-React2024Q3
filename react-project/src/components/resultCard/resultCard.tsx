import { Component } from "react";
import { Pokemon } from "../../types/types";
import "./resultCard.scss";

interface ResultsCardProps {
  data: Pokemon;
}

class ResultsCard extends Component<ResultsCardProps> {
  render() {
    const { data } = this.props;
    const { id, types, name } = data;
    return (
      <div className="results__card">
        <h2>{data.name}</h2>
        <img
          className="results__card-image"
          alt={name}
          src={
            data.sprites.other.dream_world?.front_default ??
            data.sprites.front_default
          }
        />
        <div className="results__card-desc">
          <span>ID: {id}</span>
          <span>TYPE: {types.map((item) => item.type.name).join(", ")}</span>
        </div>
      </div>
    );
  }
}

export default ResultsCard;
