import React from "react";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdDelete, MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import useQueryData from "../../../../custom-hooks/useQueryData.jsx";
import TableSpinner from "../../../../partials/spinners/TableSpinner.jsx";
import TableLoading from "../../../../partials/TableLoading.jsx";
import EditSvg from "../../../../svg/EditSvg.jsx";
import ModalDelete from "./ModalDelete.jsx";
import ModalSuccess from "../../../../partials/Modals/ModalSuccess.jsx";

const RolesTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);

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

  const handleDelete = (item) => {
    setItem(item);
    dispatch(setIsConfirm(true));
  };

  return (
    <>
      <div className="px-4">
        {isFetching && !isLoading && <TableSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
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
                  <td>{item.roles_aid}</td>
                  <td>{item.roles_name}</td>
                  <td>{item.roles_description}</td>
                  <td className="table__action">
                    <button
                      className="tooltip"
                      data-tooltip="Edit"
                      type="submit"
                      onClick={() => handleEdit}
                    >
                      <EditSvg />
                    </button>
                    <button
                      className="tooltip"
                      data-tooltip="Delete"
                      onClick={() => handleDelete(item)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && <ModalDelete item={item} setItem={setItem} />}
      {store.success && <ModalSuccess />}
    </>
  );
};

export default RolesTable;
