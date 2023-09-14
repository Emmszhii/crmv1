import React from "react";
import { MdDelete, MdRestore, MdRestorePage } from "react-icons/md";
import { BiSolidArchiveOut } from "react-icons/bi";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import useQueryData from "../../../../custom-hooks/useQueryData.jsx";
import ModalSuccess from "../../../../partials/Modals/ModalSuccess.jsx";
import TableLoading from "../../../../partials/TableLoading.jsx";
import TableSpinner from "../../../../partials/spinners/TableSpinner.jsx";
import EditSvg from "../../../../svg/EditSvg.jsx";
import ModalDelete from "./ModalDelete.jsx";
import ModalArchive from "./ModalArchive.jsx";
import ModalRestore from "./ModalRestore.jsx";
import Pills from "../../../../partials/Pills.jsx";
import Toast from "../../../../partials/Toast.jsx";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner.jsx";
import Searchbar from "../../../../partials/Searchbar.jsx";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite.jsx";
import Nodata from "../../../../partials/Nodata.jsx";
import IconNoData from "../../../../svg/IconNoData.jsx";
import IconServerError from "../../../../svg/IconServerError.jsx";
import Loadmore from "../../../../partials/Loadmore.jsx";
import { RiDeleteBinLine } from "react-icons/ri";

const BankDetailsTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  // SEARCH and LOADMORE
  const [page, setPage] = React.useState(1);
  const [onSearch, setOnSearch] = React.useState(false);
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
    queryKey: ["settings-bank-details", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/settings/bank-details/search.php`, // search endpoint
        `/v1/controllers/developer/settings/bank-details/page.php?start=${pageParam}`, // list endpoint
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
    refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
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
    console.log(store.isArhive);
  };

  return (
    <>
      <div className="px-4 relative ">
        <Searchbar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
        <div className="bank__details__wrapper">
          <ul className="bank__details__cards">
            {isFetching && status !== "loading" && <FetchingSpinner />}

            {(status == "loading" || result?.pages[0].data.length === 0) &&
              (status == "loading" ? (
                <FetchingSpinner />
              ) : (
                <div className="flex py-8 flex-col gap-1 items-center">
                  <IconNoData />
                  <h2>No Data</h2>
                </div>
              ))}

            {error && (
              <div className="text-center p-10">
                <IconServerError />
                <h2 className="pt-2">Server Error</h2>
              </div>
            )}

            {result?.pages.map((page, key) => {
              return (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => {
                    counter += item;
                    active += item.bank_details_is_active;
                    inactive += !item.bank_details_is_active;
                    return (
                      <React.Fragment key={key}>
                        <li className="bank__details__item">
                          <div className="bank__details__actions">
                            <ul>
                              {item.bank_details_is_active === 1 ? (
                                <>
                                  <li>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Edit"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <FiEdit3 />
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Archive"
                                      onClick={() => handleArchive(item)}
                                    >
                                      <FiArchive />
                                    </button>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Delete"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <RiDeleteBinLine />
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Restore"
                                      onClick={() => handleRestore(item)}
                                    >
                                      <MdRestore />
                                    </button>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          <p className="py-2 text-center">
                            {item.bank_details_is_active ? (
                              <Pills label="Active" bgc="bg-green-600" />
                            ) : (
                              <Pills label="Inactive" bgc="bg-gray-200" />
                            )}
                          </p>
                          <ul className="bank__details__data">
                            <li>
                              <h2>Bank Name: </h2>
                              <span>{item.bank_details_bank_name}</span>
                            </li>
                            <li>
                              <h3>Account Name: </h3>
                              <span>{item.bank_details_bank_name}</span>
                            </li>
                            <li>
                              <h4>Account Number: </h4>
                              <span>{item.bank_details_bank_name}</span>
                            </li>
                            <li>
                              <h5>Location: </h5>
                              <span>{item.bank_details_bank_name}</span>
                            </li>
                          </ul>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </ul>
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
      </div>
      {store.isConfirm && <ModalDelete item={item} setItem={setItem} />}
      {store.isArchive && <ModalArchive item={item} setItem={setItem} />}
      {store.isRestore && <ModalRestore item={item} setItem={setItem} />}
      {store.success && <Toast />}
    </>
  );
};

export default BankDetailsTable;