import React from "react";
import { Link } from "@reach/router";
import { Octicon, Octicons } from "octicons-react";

function StartPortal() {
  return (
    <div class="cover-container d-flex mx-auto flex-column w-100 h-100">
      <div class="inner cover container-fluid">
        <div class="row bg-dark text-center fixed-top h-100">
          <div class="col-md-12 my-auto text-white">
            <h5 class="cover-heading my-auto">Welcome to</h5>
            <h2 class="cover-heading display-4 font-weight-bold my-auto">CheckMark</h2>
            <h5 class="cover-heading my-auto">Task Management Application</h5>
            <Link class="btn btn-lg btn-outline-light mt-4" to="/main">
              <Octicon icon={Octicons.home} className="align-text-bottom mr-2" scale={1.5} />
              Home Page</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default StartPortal;