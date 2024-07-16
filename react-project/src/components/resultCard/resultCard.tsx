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
  const { data, getPokemon } = useContext(SearchContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();

  console.log(id);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  useLayoutEffect(() => {
    getPokemon(id ?? "");
  }, [getPokemon, id]);

  useEffect(() => {
    setImageLoaded(false);
  }, [data?.id]);

  return (
    <>
      {isPokemon(data) && (
        <div className="results__card" key={data.id}>
          <h2>{data.name}</h2>
          {!imageLoaded && (
            <img className="results__card-image" alt={data.name} src={logo} />
          )}
          <img
            className="results__card-image"
            alt={data.name}
            src={
              data.sprites.other.dream_world?.front_default ??
              data.sprites.front_default
            }
            onLoad={handleImageLoad}
          />
          <div className="results__card-desc">
            <span>ID: {id}</span>
            <span>
              TYPE: {data.types.map((item) => item.type.name).join(", ")}
            </span>
          </div>
        </div>
      )}{" "}
    </>
  );
}
export default ResultsCard;
