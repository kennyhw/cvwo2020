import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function EditCategory(props) {
  const [category, setCategory] = useState({}); 

  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch("/api/categories?filter[id]=" + props.categoryId);
      const { data } = await response.json();
      setCategory(data[0].attributes);
    };
    requestCategory();
  }, []);

  const handleSubmit = values => {
    const patchCategory = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/categories/" + props.categoryId, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 200) {
        navigate("/main");
      }
    };
    patchCategory();
  };

  return (
    <div>
      <h3>Edit category:</h3>
      <Link to="/main">Back</Link>
      <Formik
        enableReinitialize
        initialValues={{
          id: props.categoryId,
          type: "categories",
          attributes: {
            title: category.title,
            description: category.description
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" name="attributes.title" /><br></br>
            <Field type="text" name="attributes.description" /><br></br>
            <button type="submit">Edit</button>
          </Form>
        )}
      />
    </div>
  );
}

export default EditCategory;