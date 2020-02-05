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
    <div class="card border-secondary h-100">
      <div class="card-header d-flex flex-column text-secondary">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Add new category:</h4>
          </div>
          <div class="col-md-2 text-right">
            <Link className="btn btn-outline-warning align-bottom btn-sm mr-1" to="/main">
              <Octicon icon={Octicons.x} className="align-text-bottom" />
            </Link>
          </div>
        </div>
      </div>
      <div class="card-body d-flex flex-column align-items-start">
        {props.location.state.error ? 
          <div class="alert alert-warning alert-dismissable show fade">
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
            <Form>
              <Field type="text" class="form-control" placeholder="Enter title" name="attributes.title" /><br></br>
              <Field type="text" class="form-control" placeholder="Enter description" name="attributes.description" /><br></br>
              <button class="btn btn-secondary text-white" type="submit">Create</button>
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export default AddCategory;