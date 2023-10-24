import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as Yup from "yup";
import { queryData } from "../../../../helpers/queryData";
import {
  setCredentials,
  setIsLogin,
  setMessage,
  setValidate,
} from "../../../../../store/StoreAction";
import { setStorageRoute } from "../../../../helpers/functions-general";
import FbsLogoLg from "../../../../partials/FbsLogoLg";
import { Form, Formik } from "formik";
import { InputText } from "../../../../helpers/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const CreatePassword = () => {
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/user-other/login`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["other"] });
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        if (store.isLogin) {
          delete data.data[0].user_system_password;
          delete data.data[0].role_description;
          delete data.data[0].role_created;
          delete data.data[0].role_datetime;

          dispatch(setCredentials(data.data[0]));
          setStorageRoute(data.data[1]);
          dispatch(setIsLogin(false));
          checkRoleToRedirect(navigate, data.data[0]);
        }
      }
    },
  });
  const initVal = {
    user_other_password: "",
  };

  const yupSchema = Yup.object({
    user_other_password: Yup.string().required("Required"),
  });
  return (
    <>
      <section className="h-screen w-screen">
        <div className="flex items-center justify-center h-full w-full mx-auto flex-col gap-10">
          <div>
            <FbsLogoLg />
            <h2 className="mb-0 mt-7 font-semibold text-xl text-center">
              Login
            </h2>
          </div>
          <div className="max-w-sm w-full px-4">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                console.log(values);
                // mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="form__wrap">
                      <InputText
                        label="Password"
                        type="password"
                        name="user_other_password"
                      />
                    </div>

                    <button
                      className="btn btn--primary w-full mt-4 "
                      type="submit"
                    >
                      {mutation.isLoading ? <ButtonSpinner /> : "Login"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePassword;
