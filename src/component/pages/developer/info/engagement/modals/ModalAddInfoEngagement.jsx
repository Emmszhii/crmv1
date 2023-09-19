import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText, InputTextArea } from "../../../../../helpers/FormInputs";
import {
  getUrlParam,
  handleEscape,
} from "../../../../../helpers/functions-general";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";

const ModalAddInfoEngagement = ({ itemEdit = null }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const infoId = getUrlParam().get("infoId");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/controllers/developer/info/engagement/engagement.php?infoEngagementId=${itemEdit.info_engagement_aid}` //update
          : "/v1/controllers/developer/info/engagement/engagement.php", //add
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["info-engagement"] });
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
    info_engagement_name: itemEdit ? itemEdit.info_engagement_name : "",
    info_engagement_description: itemEdit
      ? itemEdit.info_engagement_description
      : "",
    info_engagement_info_id: itemEdit
      ? itemEdit.info_engagement_info_id
      : infoId,

    info_engagement_name_old: itemEdit ? itemEdit.info_engagement_name : "",
  };

  const yupSchema = Yup.object({
    info_engagement_name: Yup.string().required("Required"),
    info_engagement_description: Yup.string().required("Required"),
    info_engagement_info_id: Yup.string().required("Required"),
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
          <div className="overflow-auto max-h-[50vh] custom__scroll">
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
                          name="info_engagement_name"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputTextArea
                          label="Description"
                          type="text"
                          name="info_engagement_description"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Info ID"
                          id="id"
                          name="info_engagement_info_id"
                          disabled={true}
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

export default ModalAddInfoEngagement;
