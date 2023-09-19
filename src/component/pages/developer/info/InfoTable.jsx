import React from "react";
import { BiSolidArchiveOut } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdDelete, MdRestorePage } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { devNavUrl } from "../../../helpers/functions-general";
import Nodata from "../../../partials/Nodata";
import Pills from "../../../partials/Pills";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import Toast from "../../../partials/Toast";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import EditSvg from "../../../svg/EditSvg";
import ModalArchive from "./modals/ModalArchive";
import ModalDelete from "./modals/ModalDelete";
import ModalRestore from "./modals/ModalRestore";

const InfoTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  let counter = 1,
    inactive = 0,
    active = 0;

  const {
    isLoading,
    isFetching,
    error,
    data: info,
  } = useQueryData(
    `/v1/controllers/developer/info/info.php`, // endpoint
    "get", // method
    "info" // key
  );

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
            {info?.error ? (
              <ServerError />
            ) : (
              <>
                {(isLoading || info?.data.length === 0) && (
                  <tr className="text-center">
                    <td colSpan="100%">
                      {isLoading ? (
                        <TableLoading count={20} cols={3} />
                      ) : (
                        <Nodata />
                      )}
                    </td>
                  </tr>
                )}
                {error && (
                  <tr className="text-center ">
                    <td colSpan="100%">
                      <ServerError />
                    </td>
                  </tr>
                )}
                {info?.data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{counter++}</td>
                      <td>
                        {item.info_is_active === 1 ? (
                          <>
                            <Pills label="Active" bgc="bg-green-600" />
                          </>
                        ) : (
                          <>
                            <Pills label="Inactive" bgc="bg-archive" />
                          </>
                        )}
                      </td>
                      <td>{item.info_name}</td>
                      <td>{item.info_description}</td>

                      <td className="table__action">
                        <Link
                          to={`${devNavUrl}/info/list?infoId=${item.info_aid}`}
                        >
                          <button className="tooltip" data-tooltip="Info">
                            <FaRegEye />
                          </button>
                        </Link>
                        {item.info_is_active === 1 ? (
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
              </>
            )}
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

export default InfoTable;
