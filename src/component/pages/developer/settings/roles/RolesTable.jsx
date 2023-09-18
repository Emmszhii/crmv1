import React from "react";
import { BiSolidArchiveOut } from "react-icons/bi";
import { MdDelete, MdRestorePage } from "react-icons/md";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import useQueryData from "../../../../custom-hooks/useQueryData.jsx";
import Pills from "../../../../partials/Pills.jsx";
import TableLoading from "../../../../partials/TableLoading.jsx";
import Toast from "../../../../partials/Toast.jsx";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner.jsx";
import EditSvg from "../../../../svg/EditSvg.jsx";
import ModalDelete from "./modals/ModalDelete.jsx";
import ModalArchive from "./modals/ModalArchive.jsx";
import ModalRestore from "./modals/ModalRestore.jsx";

const RolesTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  let counter = 1;

  const {
    isLoading,
    isFetching,
    error,
    data: roles,
  } = useQueryData(
    `/v1/controllers/developer/settings/roles/roles.php`, // endpoint
    "get", // method
    "settings-roles" // key
  );

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
      <div className="px-4 relative">
        {isFetching && !isLoading && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || roles?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading ? (
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
                  <h1>Server Error</h1>
                </td>
              </tr>
            )}

            {roles?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>
                    {item.roles_is_active === 1 ? (
                      <>
                        <Pills label="Active" bgc="bg-green-600" />
                      </>
                    ) : (
                      <>
                        <Pills label="Inactive" bgc="bg-archive" />
                      </>
                    )}
                  </td>
                  <td>{item.roles_name}</td>
                  <td>
                    {item.roles_description.slice(0, 20)}
                    {item.roles_description.length > 20 && "..."}
                  </td>
                  <td className="table__action">
                    {item.roles_is_active === 1 ? (
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
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && <ModalDelete item={item} setItem={setItem} />}
      {store.isArchive && <ModalArchive item={item} setItem={setItem} />}
      {store.isRestore && <ModalRestore item={item} setItem={setItem} />}
      {store.success && <Toast />}
    </>
  );
};

export default RolesTable;
