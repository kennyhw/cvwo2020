import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import { Octicon, Octicons } from "octicons-react";

function EditCategory(props) {
  const [category, setCategory] = useState({});

  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch("/api/categories?filter[id]=" + props.categoryId);
      const { data } = await response.json();
      setCategory(data[0].attributes);
    };
    requestCategory();
  }, [props]);

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
      if (response.status === 422) {
        navigate("", { state: { error: "Category title is too short (minimum is 3 characters)" } });
      }
    };
    patchCategory();
  };

  return (
    <div class="card border border-secondary h-100 shadow">
      <div class="card-header d-flex flex-column text-secondary">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Edit Category</h4>
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
            <Form class="col-md-12">
              <Field type="text" class="form-control" name="attributes.title" /><br></br>
              <Field type="text" class="form-control" name="attributes.description" /><br></br>
              <button class="btn btn-secondary text-white" type="submit">Save</button>
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export default EditCategory;