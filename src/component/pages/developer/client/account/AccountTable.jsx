import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { BiSolidArchiveOut } from "react-icons/bi";
import { MdDelete, MdRestorePage } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite.jsx";
import Loadmore from "../../../../partials/Loadmore.jsx";
import Pills from "../../../../partials/Pills.jsx";
import Searchbar from "../../../../partials/Searchbar.jsx";
import TableLoading from "../../../../partials/TableLoading.jsx";
import Toast from "../../../../partials/Toast.jsx";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner.jsx";
import EditSvg from "../../../../svg/EditSvg.jsx";
import ModalArchive from "./ModalArchive.jsx";
import ModalDelete from "./ModalDelete.jsx";
import ModalRestore from "./ModalRestore.jsx";
import ServerError from "../../../../partials/ServerError.jsx";
import Nodata from "../../../../partials/Nodata.jsx";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl } from "../../../../helpers/functions-general.jsx";

const AccountTable = ({ setItemEdit }) => {
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
    queryKey: ["client-account", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/client/account/search.php`, // search endpoint
        `/v1/controllers/developer/client/account/page.php?start=${pageParam}`, // list endpoint
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
      <div className="pt-4 relative">
        {isFetching && status !== "loading" && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="!w-auto">Contact Name</th>
              <th>Contact Email</th>
              <th>Account Number</th>
              <th>Company Name</th>
              <th>Role</th>
              <th>Status</th>
              <th className="!w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "loading" ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <Nodata />
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
                    active += item.client_account_is_active;
                    inactive += !item.client_account_is_active;
                    return (
                      <tr key={key}>
                        <td>{counter++}</td>
                        <td>{item.client_account_contact_name}</td>
                        <td>{item.client_account_contact_email}</td>
                        <td>{item.client_account_number}</td>
                        <td>{item.client_account_company_name}</td>
                        <td>{item.client_account_role}</td>
                        <td>
                          {item.client_account_is_active === 1 ? (
                            <Pills label="Active" bgc="bg-success" />
                          ) : (
                            <Pills label="Inactive" bgc="bg-archive" />
                          )}
                        </td>
                        <td className="table__action">
                          <Link
                            to={`${devNavUrl}/client/account/view?clientAccountId=${item.client_account_aid}`}
                          >
                            <button className="tooltip" data-tooltip="Info">
                              <FaRegEye />
                            </button>
                          </Link>
                          {item.client_account_is_active === 1 ? (
                            <>
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

export default AccountTable;
