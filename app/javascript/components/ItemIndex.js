import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import { Octicon, Octicons } from "octicons-react";
import AddItem from "./AddItem";
import ViewItem from "./ViewItem";
import EditItem from "./EditItem";
import CompleteItem from "./CompleteItem";

// Displays all the items in a certain category
function ItemIndex(props) {
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

  // Fetches all the items in a category (from the API)
  useEffect(() => {
    const requestCategory = async () => {
      const response = await fetch("/api/categories?filter[id]=" + props.categoryId);
      const { data } = await response.json();
      setCategory(data[0].attributes);
    };
    const requestItems = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items");
      const { data } = await response.json();
      setItems(data);
    };
    requestCategory();
    requestItems();
  }, [props]);

  return (
    <div>
      <div class="row jumbotron w-100 py-2 mx-auto bg-dark text-white no-gutters">
        <div class="col-12">
          <h3><strong>{category.title}</strong></h3>
        </div>
        <div class="col-12">
          <h3 class="small">{category.description}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Link to="new-item" className="btn btn-outline-success btn-md">
            New Item <Octicon icon={Octicons.plus} className="align-text-bottom" />
          </Link>
        </div>
      </div>
      <br></br>
      <div class="row">
        <div class="col-md-6">
          <ul class="list-group">
            {items.map(item =>
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-6">
                    {item.attributes.content}
                  </div>
                  <div class="col-md-6 text-right">
                    <Link className="btn btn-outline-success btn mr-2" to={"complete-item/" + item.id}>
                      <Octicon icon={Octicons.check} scale={1.2} className="align-text-top" />
                    </Link>
                    <Link className="btn btn-outline-success btn mr-2" to={"edit-item/" + item.id}>
                      <Octicon icon={Octicons.pencil} className="align-baseline" />
                    </Link>
                    <Link className="btn btn-outline-success btn mr-2" to={"view-item/" + item.id}>
                      <Octicon icon={Octicons.info} className="align-baseline" />
                    </Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div class="col-md-6">
          <Router primary={false}>
            <AddItem path="new-item" />
            <ViewItem path="view-item/:itemId" />
            <EditItem path="edit-item/:itemId" />
            <CompleteItem path="complete-item/:itemId" />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default ItemIndex;