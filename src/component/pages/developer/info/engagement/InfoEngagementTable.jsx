import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import Searchbar from "../../../../partials/Searchbar";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import ServerError from "../../../../partials/ServerError";

const InfoEngagementTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  // SEARCH and LOADMORE
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  // Counters
  let counter = 1;
  let active = 0;
  let inactive = 0;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["info-engagement", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/info/engagement/search.php`, // search endpoint
        `/v1/controllers/developer/info/engagement/page.php?start=${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
    // networkMode: "always",
    // cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  const handleDelete = (item) => {
    setItem(item);
    dispatch(setIsConfirm(true));
  };

  const handleRestore = (item) => {
    setItem(item);
    dispatch(setIsRestore(true));
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(!store.isArchive));
    setItem(item);
  };
  return (
    <>
      <Searchbar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
      />
      <div className="px-4 relative">
        {isFetching && status !== "loading" && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "loading" ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <h1>No data.</h1>
                  )}
                </td>
              </tr>
            )}

            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {result?.pages.map((page, key) => {
              return (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => {
                    active += item.info_engagement_is_active;
                    inactive += !item.info_engagement_is_active;
                    return (
                      <React.Fragment key={key}>
                        <tr key={key}>
                          <td>{counter++}</td>
                          <td>
                            {item.info_engagement_is_active === 1 ? (
                              <>
                                <Pills label="Active" bgc="bg-green-600" />
                              </>
                            ) : (
                              <>
                                <Pills label="Inactive" bgc="bg-archive" />
                              </>
                            )}
                          </td>
                          <td>{item.info_engagement_name}</td>
                          <td>{item.info_engagement_description}</td>

                          <td className="table__action">
                            {item.info_engagement_is_active === 1 ? (
                              <>
                                <button
                                  className="tooltip"
                                  data-tooltip="Edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  <EditSvg />
                                </button>
                                <button
                                  className="tooltip"
                                  data-tooltip="Archive"
                                  onClick={() => handleArchive(item)}
                                >
                                  <BiSolidArchiveOut />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="tooltip"
                                  data-tooltip="Restore"
                                  onClick={() => handleRestore(item)}
                                >
                                  <MdRestorePage />
                                </button>
                                <button
                                  className="tooltip"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(item)}
                                >
                                  <MdDelete />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="text-center">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
          />
        </div>
      </div>

      {store.isConfirm && <ModalDelete item={item} setItem={setItem} />}
      {store.isArchive && <ModalArchive item={item} setItem={setItem} />}
      {store.isRestore && <ModalRestore item={item} setItem={setItem} />}
      {store.success && <Toast />}
    </>
  );
};

export default InfoEngagementTable;
