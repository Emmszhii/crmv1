import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
}) => {
  if (page === result?.total_pages) {
    return (
      <>
        {isFetchingNextPage ? (
          <button type="button" className="w-full text-primary mx-auto mt-5">
            {isFetchingNextPage ? (
              <ButtonSpinner color="stroke-accent" />
            ) : (
              "Load More"
            )}
          </button>
        ) : (
          <div className="text-black mt-8 mb-0 p-1.5 text-center">
            End of list.
          </div>
        )}
      </>
    );
  }

  if (hasNextPage) {
    return (
      <button
        ref={refView}
        type="button"
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className={`btn btn--primary text-white mx-auto mt-5`}
      >
        {isFetchingNextPage ? (
          <ButtonSpinner color={`stroke-primary`} />
        ) : (
          <span>Load more</span>
        )}
      </button>
    );
  }
};

export default Loadmore;
