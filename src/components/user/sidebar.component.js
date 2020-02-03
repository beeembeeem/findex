import React, { Component } from 'react';
import  { Auth, API, graphqlOperation } from 'aws-amplify';
import navbarSettings from "../../settings/navbar";
import { Link } from 'react-router-dom';

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {portfolioList : []};
    this.navbar = navbarSettings.items_auth

  }

  componentDidMount(){

}


  render() {
    if (this.props.data.isAuthenticated){
        return (
        <div className="sidebar col-2 d-lg-block d-none " data-active-color="rose" data-background-color="black" data-image="#">
            <div className="logo text-center ">

        <button onClick={this.infoNotice} className=" text-light btn btn-info btn-lg logo-normal">
             {"Help"} 
        </button>
    </div>
    <div className="sidebar-user">
    <div className="user">
            <div className="info">
                <a data-toggle="collapse" href="#" className="collapsed" aria-expanded="false">
                    <p className="text-center text-light m-0 p-0">
                         {this.props.data.user.username} 
                    </p>
                </a>

            </div>
        </div>
    <div className="text-center py-5"> 
    <div className=" text-info bg-light rounded p-4">    Thank you for supporting our website. We are currently working on our core features and will be launching very soon.
</div>
    </div>
        </div></div>
          )
    }
    else{
        return(
            <p></p>
        )
    }
  }
}

export default sidebar



          //   <div className="text-dark sidebar col text-center pt-2 "> 
          //            <Link to="/" className="navbar-brand text-light m-0 p-2  ">{navbarSettings.brand_name}  </Link>
          //   <ul className="nav flex-column ">
          //     {this.navbar.map(item =>
          //       <li key={item.id} className="" >
          //         <Link 
          //         to={{
          //           pathname:item.url,
          //           }} 
          //         className="nav-link text-light   "><p className={(item.url==window.location.pathname)?"border-right m-0  border-light":"m-0"}>{item.name}</p></Link>
          //       </li>
          //     )}
          //   </ul>
          // </div>