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
import IconServerError from "../../../../svg/IconServerError.jsx";
import Nodata from "../../../../partials/Nodata.jsx";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl } from "../../../../helpers/functions-general.jsx";
const SystemAccountTable = ({ setItemEdit }) => {
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
    queryKey: ["settings-system-account", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/settings/system-account/search.php`, // search endpoint
        `/v1/controllers/developer/settings/system-account/page.php?start=${pageParam}`, // list endpoint
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
      <div className="pb-4">
        <Searchbar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
        />
      </div>
      <div className="relative">
        {isFetching && status !== "loading" && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) &&
              (status === "loading" ? (
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    <TableLoading count={20} cols={3} />
                  </td>
                </tr>
              ) : (
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    <div className="flex justify-center py-2 ">
                      <Nodata />
                    </div>
                  </td>
                </tr>
              ))}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <div className="flex justify-center py-2">
                    <IconServerError />
                  </div>
                  <h1 className="text-lg text-gray-300 font-bold">
                    Server Error
                  </h1>
                </td>
              </tr>
            )}
            {result?.pages.map((page, key) => {
              return (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => {
                    active += item.system_account_is_active;
                    inactive += !item.system_account_is_active;
                    return (
                      <React.Fragment key={key}>
                        <tr key={key}>
                          <td>{counter++}</td>
                          <td>
                            {item.system_account_is_active === 1 ? (
                              <>
                                <Pills label="Active" bgc="bg-green-600" />
                              </>
                            ) : (
                              <>
                                <Pills label="Inactive" bgc="bg-gray-300" />
                              </>
                            )}
                          </td>
                          <td>{item.system_account_name}</td>
                          <td>{item.system_account_email}</td>
                          <td>{item.system_account_role}</td>
                          <td className="table__action">
                            {item.system_account_is_active === 1 ? (
                              <>
                                <Link
                                  to={`${devNavUrl}/settings/system-account/view?systemAccountId=${item.system_account_aid}`}
                                >
                                  <button
                                    className="tooltip"
                                    data-tooltip="View"
                                  >
                                    <FaRegEye />
                                  </button>
                                </Link>
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
                                <Link
                                  to={`${devNavUrl}/settings/system-account/view?systemAccountId=${item.system_account_aid}`}
                                >
                                  <button
                                    className="tooltip"
                                    data-tooltip="View"
                                  >
                                    <FaRegEye />
                                  </button>
                                </Link>
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

export default SystemAccountTable;
