import { ReactElement, useCallback, useContext } from "react";
import "./pagination.scss";
import { SearchContext } from "../../context/searchContext";
import { isPokemonListApiResponse } from "../../types/guards";

function PaginationBox(): ReactElement {
  const { getPage, limit, offset, count, data } = useContext(SearchContext);

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
