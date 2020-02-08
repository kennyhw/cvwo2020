import React from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { Octicon, Octicons } from "octicons-react";

function AddItem(props) {
  const handleSubmit = values => {
    const requestItem = async () => {
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
      if (response.status === 422) {
        navigate("", { state: { error: "Content is too short (minimum is 3 characters)" } });
      }
    };
    requestItem();
  };

  return (
    <div class="card border border-success bg-success h-100 shadow">
      <div class="card-header text-white">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Add New Item</h4>
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
            <Form class="col-md-12">
              <Field class="form-control mb-0" type="text" placeholder="Enter content" name="attributes.content" /><br></br>
              <button class="btn btn-success text-white" type="submit">Create</button>
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export default AddItem;