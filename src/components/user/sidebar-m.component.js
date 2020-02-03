import React, { Component } from 'react';
import  { Auth, API, graphqlOperation } from 'aws-amplify';
import navbarSettings from "../../settings/navbar";
import { Link } from 'react-router-dom';

class sidebarM extends Component {
  constructor(props) {
    super(props);
    this.state = {portfolioList : []};
    this.navbar = navbarSettings.items_auth

  }

  componentDidMount(){

}
   componentDidUpdate(){
  }


  render() {
    if (this.props.data.isAuthenticated){
        return (
        <div className= {this.props.trigger.showMobileBar?"sidebar col-5 mobile-bar d-lg-none bar-show" : "sidebar col-5 mobile-bar d-lg-none"} data-active-color="rose" data-background-color="black" data-image="#">
            <div className="logo text-center ">

        <a href="http://www.creative-tim.com" className="simple-text text-light logo-normal">
             {navbarSettings.brand_name} 
        </a>
    </div>
    <div className="sidebar-user">
    <div className="user">
            <div className="photo">
                <img src="../assets/img/faces/avatar.jpg"/>
            </div>
            <div className="info">
                <a data-toggle="collapse" href="#collapseExample" className="collapsed" aria-expanded="false">
                    <span>
                         {this.props.data.user.username} 
                        <b className="caret"></b>
                    </span>
                </a>
                <div className="clearfix"></div>
                <div className="collapse" id="collapseExample" aria-expanded="false" >
                    <ul className="nav">
                        <li>
                            <a  >
                                <span className="sidebar-mini"> MP </span>
                                <span className="sidebar-normal"> My Profile </span>
                            </a>
                        </li>
                        <li>
                            <a  >
                                <span className="sidebar-mini"> EP </span>
                                <span className="sidebar-normal"> Edit Profile </span>
                            </a>
                        </li>
                        <li>
                            <a  >
                                <span className="sidebar-mini"> S </span>
                                <span className="sidebar-normal"> Settings </span>
                            </a>
                        </li>
                    </ul>
                </div>
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

export default sidebarM



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