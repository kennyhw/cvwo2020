import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function EditItem(props) {
  const [item, setItem] = useState({}); 

  useEffect(() => {
    const requestItem = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items?filter[id]=" + props.itemId);
      const { data } = await response.json();
      setItem(data[0].attributes);
    };
    requestItem();
  }, []);

  const handleSubmit = values => {
    const patchItem = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/items/" + props.itemId, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 200) {
        navigate("/main/category/" + props.categoryId);
      }
    };
    patchItem();
  };

  return (
    <div>
      <Link to={"/main/category/" + props.categoryId}>Back</Link>
      <h3>Edit item:</h3>
      <Formik
        enableReinitialize
        initialValues={{
          id: props.itemId,
          type: "items",
          attributes: {
            content: item.content
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" name="attributes.content" /><br></br>
            <button type="submit">Save</button>
          </Form>
        )}
      />
    </div>
  );
}

export default EditItem;