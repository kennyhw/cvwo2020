import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { Octicon, Octicons } from "octicons-react";

function ItemIndex(props) {
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

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
  }, [props.categoryId]);

  return (
    <div>
      <div class="row jumbotron w-100 py-2 mx-auto bg-dark text-white">
        <div class="col-md-12">
          <h3><strong>{category.title}</strong></h3>
        </div>
        <div class="col-md-12">
          <h3 class="small">{category.description}</h3>
        </div>
      </div>
      <div class ="row">
        <div class="col-md-12">
          <Link to="new-item" className="btn btn-outline-dark btn-md">
            New Item <Octicon icon={Octicons.plus} className="align-text-bottom" />
          </Link>
        </div>
      </div>
      <br></br>
      <ul class="list-group table-bordered">
        {items.map(item => 
          <li class="list-group-item">
            <div class="row">
              <div class="col-md-4">
                {item.attributes.content}
              </div>
              <div class="col-md-8">
                <Link to={"view-item/" + item.id}>View</Link>
                <Link to={"edit-item/" + item.id}>Edit</Link>
                <Link to={"delete-item/" + item.id}>Complete / Delete</Link>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ItemIndex;