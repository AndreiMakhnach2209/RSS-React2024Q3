import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./resultCard.scss";
import logo from "../../assets/3.svg";
import { SearchContext } from "../../context/searchContext";
import { isPokemon } from "../../types/guards";
import { useParams } from "react-router-dom";

function ResultsCard(): ReactElement {
  const { details, getPokemon } = useContext(SearchContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  useLayoutEffect(() => {
    getPokemon(id ?? "");
  }, [getPokemon, id]);

  useEffect(() => {
    setImageLoaded(false);
  }, [details?.id]);

  return (
    <>
      {isPokemon(details) && (
        <div className="results__card" key={details.id}>
          <h2>{details.name}</h2>
          {!imageLoaded && (
            <img
              className="results__card-image"
              alt={details.name}
              src={logo}
            />
          )}
          <img
            className="results__card-image"
            alt={details.name}
            src={
              details.sprites.other.dream_world?.front_default ??
              details.sprites.front_default
            }
            onLoad={handleImageLoad}
          />
          <div className="results__card-desc">
            <span>ID: {id}</span>
            <span>
              TYPE: {details.types.map((item) => item.type.name).join(", ")}
            </span>
            <span>
              HEIGHT: {details.height} WEIGHT: {details.weight}
            </span>
            <div>
              ABILITIES:{" "}
              {details.abilities.map((item) => (
                <p key={item.ability.name}>{item.ability.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
export default ResultsCard;
