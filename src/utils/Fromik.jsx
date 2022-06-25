import React from "react";

function Fromik() {
  return (
    <Fromik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("name is required")
          .min(6, "your name has to be greter then 6 character"),
        email: Yup.string().email().required("email is requred"),
        password: Yup.string()
          .length(8, "your password has to be up then 8 character")
          .required("password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" id="name" />
          <ErrorMessage name="name" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Field name="email" id="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Field name="password" id="password" />
          <ErrorMessage name="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Fromik>
  );
}

export default Fromik;
