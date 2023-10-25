import React from "react";
import { BiSolidArchiveOut } from "react-icons/bi";
import { MdDelete, MdRestorePage } from "react-icons/md";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import Nodata from "../../../../../partials/Nodata";
import Pills from "../../../../../partials/Pills";
import ServerError from "../../../../../partials/ServerError";
import TableLoading from "../../../../../partials/TableLoading";
import FetchingSpinner from "../../../../../partials/spinners/FetchingSpinner";
import EditSvg from "../../../../../svg/EditSvg";
import ModalArchive from "./modals/ModalArchive";
import ModalDelete from "./modals/ModalDelete";
import ModalRestore from "./modals/ModalRestore";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../../store/StoreAction";

const UsersRolesTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  let counter = 1;

  // get Roles
  const {
    isLoading: isLoadingRoles,
    error: errorRoles,
    data: roles,
  } = useQueryData(
    `/v1/controllers/developer/settings/users/roles/roles.php`, // endpoint
    "get", // method
    "settings-users-roles" // key
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
  };

  return (
    <>
      <div className="px-4 relative">
        {isLoadingRoles && <FetchingSpinner />}
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
            {(isLoadingRoles || roles?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoadingRoles ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <Nodata />
                  )}
                </td>
              </tr>
            )}

            {errorRoles && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {roles?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>
                    {item.settings_roles_is_active === 1 ? (
                      <>
                        <Pills label="Active" bgc="bg-green-600" />
                      </>
                    ) : (
                      <>
                        <Pills label="Inactive" bgc="bg-archive" />
                      </>
                    )}
                  </td>
                  <td>{item.settings_roles_name}</td>
                  <td>{item.settings_roles_description}</td>
                  <td className="table__action">
                    {item.settings_roles_is_active === 1 ? (
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
    </>
  );
};

export default UsersRolesTable;
