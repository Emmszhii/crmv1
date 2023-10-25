import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import {
  setIsArchive,
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../../store/StoreContext";
import { queryData } from "../../../../../../helpers/queryData";

const ModalArchive = ({ item, setItem }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `/v1/controllers/developer/settings/users/roles/active.php?rolesId=${item.settings_roles_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: `settings-users-roles` });
      //   dispatch(setIsRestore(false));

      if (data.success) {
        dispatch(setIsArchive(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Archive succesfully.`));
      }
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleYes = async () => {
    // // mutate data
    mutation.mutate({
      isActive: 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsArchive(!store.isArchive));
    setItem(null);
  };

  return (
    <>
      <div className="bg-black/50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div
          className={`absolute mx-1 bg-white border border-gray-200 rounded-md max-w-[420px] w-full shadow-xl`}
        >
          <div className="modal__header relative px-4 pt-8 ">
            <div className="text-6xl text-warning flex justify-center pb-2">
              <AiFillExclamationCircle />
            </div>
            <h2 className="text-center font-bold text-warning text-lg">
              CONFIRM
            </h2>
            <button className="absolute top-4 right-4" onClick={handleClose}>
              <FaTimes className="text-gray-700 text-sm" />
            </button>
          </div>
          <div className="px-4 pt-4 pb-2 text-center">
            <h3 className="text-sm pb-4">
              Are you sure you want to archive this?
            </h3>
            <p className="font-bold text-base">"{item.settings_roles_name}"</p>
          </div>
          <div className="flex flex-col gap-2 mx-5 mb-6 mt-10 text-sm font-thin">
            <button
              className="btn btn--outline"
              type="submit"
              onClick={handleYes}
            >
              Proceed
            </button>
            <button className="btn btn--warning" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalArchive;
