import React from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { Octicon, Octicons } from "octicons-react";

function AddCategory(props) {
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
      if (response.status === 422) {
        navigate("", { state: { error: "Category title is too short (minimum is 3 characters)" } });
      }
    };
    requestCategory();
  };

  return (
    <div class="card border border-secondary h-100">
      <div class="card-header text-secondary">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Add New Category</h4>
          </div>
          <div class="col-md-2 text-right">
            <Link className="btn btn-outline-warning align-bottom btn-sm mr-1" to="/main">
              <Octicon icon={Octicons.x} className="align-text-bottom" />
            </Link>
          </div>
        </div>
      </div>
      <div class="card-body d-flex flex-column align-items-start no-gutters">
        {props.location.state.error ? 
          <div class="alert alert-warning alert-dismissable show fade py-1 mb-3 w-100">
            <Octicon icon={Octicons.issueOpened} scale={1.35} className="mr-2" />
            {props.location.state.error}
          </div>
        : ""}
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
            <Form class="col-md-12">
              <Field class="form-control" type="text" placeholder="Enter title" name="attributes.title" /><br></br>
              <Field class="form-control" type="text" placeholder="Enter description" name="attributes.description" /><br></br>
              <button class="btn btn-secondary text-white" type="submit">Create</button>
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export default AddCategory;