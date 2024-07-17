import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "./pagination.scss";
import { SearchContext } from "../../context/searchContext";
import { isPokemonListApiResponse } from "../../types/guards";
import { useSearchParams } from "react-router-dom";

function PaginationBox(): ReactElement {
  const { getPage, count, data } = useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(
    parseInt(searchParams.get("limit") || "20")
  );
  const [offset, setOffset] = useState(
    parseInt(searchParams.get("offset") || "0")
  );

  useEffect(() => {
    setLimit(parseInt(searchParams.get("limit") || "20"));
    setOffset(parseInt(searchParams.get("offset") || "0"));
  }, [searchParams]);

  const { next, previous } = isPokemonListApiResponse(data)
    ? data
    : { next: null, previous: null };

  const handleClickNext = useCallback(() => {
    getPage("next");
  }, [getPage]);
  const handleClickPrev = useCallback(() => {
    getPage("previous");
  }, [getPage]);

  return (
    <div className="pagination-box">
      <button onClick={handleClickPrev} disabled={!previous}>
        Prev
      </button>
      <span>
        {Math.round(offset / limit) + 1} of {Math.ceil(count / limit)}{" "}
      </span>
      <button
        onClick={handleClickNext}
        disabled={!next}
        data-testid="Next_page_btn"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationBox;
