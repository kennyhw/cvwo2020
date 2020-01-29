import React from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function AddItem(props) {
  const handleSubmit = values => {
    const requestItem= async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/items", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 201) {
        navigate("/main/category/" + props.categoryId);
      }
    };
    requestItem();
  };
  
  return (
    <div>
      <h3>Add new item:</h3>
      <Link to={"/main/category/" + props.categoryId}>Back</Link>
      <Formik
        initialValues={{
          type: "items",
          attributes: {
            content: ""
          },
          relationships: {
            category: {
              data: {
                id: props.categoryId,
                type: "categories"
              }
            }
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" placeholder="Enter item" name="attributes.content" /><br></br>
            <button type="submit">Create</button>
          </Form>
        )}
      />
    </div>
  );
}

export default AddItem;