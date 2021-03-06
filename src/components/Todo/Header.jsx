import React from "react";
import "./custom.css";
class Header extends React.Component {

  state = {admin: true} 
  Idea_get = () => {
    if(localStorage.getItem("role")==="Admin"){
      this.setState({admin: false});
    }else{
      this.setState({admin: true});
    }
  }
  
  render(){
    return (
      <div>
        <nav class="navbar navbar-light bg-light" id="navbar-pad">
          {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""></img> */}
          Daily Journal
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav justify-content-end">
              <li class="nav-item active">
                <a class="nav-link" href="http://localhost:3000/todo">
                  View Blogs<span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                {this.state.admin===true && 
                  <a class="nav-link">
                    View Ideas
                  </a>
                }
                {this.state.admin===false &&
                  <a class="nav-link" href="/idea">
                    View Ideas
                  </a>
                }
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/idea/compose">
                  Compose Ideas
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
