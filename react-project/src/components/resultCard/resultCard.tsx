import { ReactElement, useCallback, useEffect, useState } from "react";
import { Pokemon } from "../../types/types";
import "./resultCard.scss";
import logo from "../../assets/3.svg";

interface ResultsCardProps {
  data: Pokemon;
}

function ResultsCard({ data }: ResultsCardProps): ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
  }, [data.id]);

  const { id, types, name } = data;

  return (
    <div className="results__card" key={data.id}>
      <h2>{data.name}</h2>
      {!imageLoaded && (
        <img className="results__card-image" alt={name} src={logo} />
      )}
      <img
        className="results__card-image"
        alt={name}
        src={
          data.sprites.other.dream_world?.front_default ??
          data.sprites.front_default
        }
        onLoad={handleImageLoad}
      />
      <div className="results__card-desc">
        <span>ID: {id}</span>
        <span>TYPE: {types.map((item) => item.type.name).join(", ")}</span>
      </div>
    </div>
  );
}
export default ResultsCard;
