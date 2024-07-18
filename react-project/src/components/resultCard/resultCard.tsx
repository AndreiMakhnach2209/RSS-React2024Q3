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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function ResultsCard(): ReactElement {
  const { details, getPokemon } = useContext(SearchContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const onClose = (): void => {
    navigate(`/?${searchParams}`);
  };

  useLayoutEffect(() => {
    getPokemon(id ?? "");
  }, [getPokemon, id]);

  useEffect(() => {
    setImageLoaded(false);
  }, [id]);

  return (
    <>
      {isPokemon(details) && (
        <div className="results__card" key={details.id}>
          <button className="card__close-btn" onClick={onClose}>
            X
          </button>
          <h2 data-testid="results-card-name">{details.name}</h2>
          {!imageLoaded && (
            <img
              className="results__card-image"
              alt={details.name}
              src={logo}
              data-testid="results-card-image"
            />
          )}
          {id === `${details.id}` && (
            <img
              className="results__card-image"
              alt={details.name}
              src={
                details.sprites.other.dream_world?.front_default ??
                details.sprites.front_default
              }
              onLoad={handleImageLoad}
              data-testid="results-card-image"
            />
          )}
          <div className="results__card-desc" data-testid="results-card-desc">
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
