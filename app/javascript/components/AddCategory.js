import React from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function AddCategory() {
  const handleSubmit = values => {
    const requestCategory = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/categories", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 201) {
        navigate("/main");
      }
    };
    requestCategory();
  };
  
  return (
    <div>
      <h3>Add new category:</h3>
      <Link to="/main">Back</Link>
      <Formik
        initialValues={{
          type: "categories",
          attributes: {
            title: "",
            description: ""
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" placeholder="Enter title" name="attributes.title" /><br></br>
            <Field type="text" placeholder="Enter description" name="attributes.description" /><br></br>
            <button type="submit">Create</button>
          </Form>
        )}
      />
    </div>
  );
}

export default AddCategory;