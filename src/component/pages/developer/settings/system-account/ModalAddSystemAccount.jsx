import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StoreContext } from "../../../../../store/StoreContext";
import { queryData } from "../../../../helpers/queryData";
import { Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { handleEscape } from "../../../../helpers/functions-general";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../../store/StoreAction";

const ModalAddSystemAccount = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/controllers/developer/settings/system-account/system-account.php?systemAccountId=${itemEdit.system_account_aid}` //update
          : "/v1/controllers/developer/settings/system-account/system-account.php", //add
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["settings-system-account"] });
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? `updated` : `added`}.`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    system_account_name: itemEdit ? itemEdit.system_account_name : "",
    system_account_email: itemEdit ? itemEdit.system_account_email : "",
    system_account_role: itemEdit ? itemEdit.system_account_role : "",

    system_account_name_old: itemEdit ? itemEdit.system_account_name : "",
  };

  const yupSchema = Yup.object({
    system_account_name: Yup.string().required("Required"),
    system_account_email: Yup.string().required("Required"),
    system_account_role: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  handleEscape(() => handleClose());

  return (
    <>
      <div className="bg-black/50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div
          className={`absolute mx-1 bg-white border border-gray-200 rounded-md max-w-[420px] w-full shadow-xl`}
        >
          <div className="modal__header relative p-4">
            <h3 className="font-bold">
              {itemEdit ? "Update" : "Add"} System Account
            </h3>
            <button className="absolute top-4 right-4" onClick={handleClose}>
              <FaTimes className="text-gray-700 text-sm" />
            </button>
          </div>
          <div className="overflow-auto max-h-[50vh]">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                console.log("values", values);
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="modal__body p-4">
                      <div className="form__wrap">
                        <InputText
                          label="Name"
                          type="text"
                          name="system_account_name"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Email"
                          type="text"
                          name="system_account_email"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Role"
                          type="text"
                          name="system_account_role"
                          disabled={mutation.isLoading}
                        />
                      </div>
                    </div>
                    <div className="modal__action flex justify-end gap-2 bg-gray-100 p-4">
                      <button
                        className="btn btn--primary"
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn--cancel"
                        disabled={mutation.isLoading}
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddSystemAccount;
