import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { Octicon, Octicons } from "octicons-react";

function ViewItem(props) {
  const [item, setItem] = useState({});

  useEffect(() => {
    const requestItem = async () => {
      const response = await fetch("/api/categories/" + props.categoryId + "/items?filter[id]=" + props.itemId);
      const { data } = await response.json();
      setItem(data[0].attributes);
    };
    requestItem();
  }, [props]);

  return (
    <div class="card border border-success bg-success h-100 shadow">
      <div class="card-header text-white">
        <div class="row">
          <div class="col-md-10">
            <h4 class="font-weight-bold">Item Details</h4>
          </div>
          <div class="col-md-2 text-right">
            <Link className="btn btn-outline-light align-bottom btn-sm mr-1" to={"/main/category/" + props.categoryId}>
              <Octicon icon={Octicons.x} className="align-text-bottom" />
            </Link>
          </div>
        </div>
      </div>
      <div class="card-body bg-white d-flex flex-column align-items-start no-gutters">
          <h6><strong>Content:</strong></h6><h6 class="text-muted">{item.content}</h6>
          <h6><strong>Created at:</strong></h6><h6 class="text-muted">{new Date(Date.parse(item["created-at"])).toLocaleTimeString()}, {new Date(Date.parse(item["created-at"])).toDateString()}</h6>
          <h6><strong>Updated at:</strong></h6><h6 class="text-muted">{new Date(Date.parse(item["updated-at"])).toLocaleTimeString()}, {new Date(Date.parse(item["updated-at"])).toDateString()}</h6>
      </div>
    </div>
  );
}

export default ViewItem;