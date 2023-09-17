import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { handleEscape } from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { Form, Formik } from "formik";

const ModalAddClientList = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/controllers/developer/client/list/client-list.php?clientListId=${itemEdit.client_list_aid}` //update
          : "/v1/controllers/developer/client/list/client-list.php", //add
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
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
    client_list_account_number: itemEdit
      ? itemEdit.client_list_account_number
      : "",
    client_list_company_name: itemEdit ? itemEdit.client_list_company_name : "",
    client_list_company_email: itemEdit
      ? itemEdit.client_list_company_email
      : "",
    client_list_contact_email: itemEdit
      ? itemEdit.client_list_contact_email
      : "",
    client_list_company_mobile: itemEdit
      ? itemEdit.client_list_company_mobile
      : "",

    client_list_account_number_old: itemEdit
      ? itemEdit.client_list_account_number
      : "",
  };

  const yupSchema = Yup.object({
    client_list_account_number: Yup.string().required("Required"),
    client_list_company_name: Yup.string().required("Required"),
    client_list_company_email: Yup.string().required("Required"),
    client_list_contact_email: Yup.string().required("Required"),
    client_list_company_mobile: Yup.string().required("Required"),
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
              {" "}
              {itemEdit ? "Update" : "Add"} Client List
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
                          label="Account Number"
                          type="text"
                          name="client_list_account_number"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Company Name"
                          type="text"
                          name="client_list_company_name"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Company Email"
                          type="text"
                          name="client_list_company_email"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Contact Email"
                          type="text"
                          name="client_list_contact_email"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Contact Mobile"
                          type="text"
                          name="client_list_company_mobile"
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

export default ModalAddClientList;
