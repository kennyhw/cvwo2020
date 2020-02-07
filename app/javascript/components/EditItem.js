import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { Octicon, Octicons } from "octicons-react";

function EditItem(props) {
  const [item, setItem] = useState({});

  useEffect(() => {
    const requestItem = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items?filter[id]=" + props.itemId);
      const { data } = await response.json();
      setItem(data[0].attributes);
    };
    requestItem();
  }, [props]);

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
      if (response.status === 422) {
        navigate("", { state: { error: "Content is too short (minimum is 3 characters)" } });
      }
    };
    patchItem();
  };

  return (
    <div class="card border border-success bg-success h-100">
      <div class="card-header text-white">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Edit Item</h4>
          </div>
          <div class="col-md-2 text-right">
            <Link className="btn btn-outline-light align-bottom btn-sm mr-1" to={"/main/category/" + props.categoryId}>
              <Octicon icon={Octicons.x} className="align-text-bottom" />
            </Link>
          </div>
        </div>
      </div>
      <div class="card-body bg-white d-flex flex-column align-items-start no-gutters">
        {props.location.state.error ?
          <div class="alert alert-info alert-dismissable show fade py-1 w-100">
            <Octicon icon={Octicons.issueOpened} scale={1.35} className="mr-2" />
            {props.location.state.error}
          </div>
          : ""}
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
            <Form class="col-md-12">
              <Field class="form-control mb-0" type="text" name="attributes.content" /><br></br>
              <button class="btn btn-success text-white" type="submit">Save</button>
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export default EditItem;