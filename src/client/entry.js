
var Router = require('react-router-component')

import React from 'react';

import ReactDOM from "react-dom";


import axios from "axios";
var Locations = Router.Locations
var Location = Router.Location
var Link = require('react-router-component').Link

import Main from "../components/Main";
import Login from "../components/Login"

import BlogList from "../components/blog/BlogList"
import NewBlog from "../components/blog/NewBlog"
import BlogEdit from "../components/blog/BlogEdit"

import PageList from "../components/page/PageList"
import PageEdit from "../components/page/PageEdit"
import NewPage from "../components/page/NewPage"

import BlogSectionList from "../components/blog/BlogSectionList"
import BlogSectionEdit from "../components/blog/BlogSectionEdit"
import NewBlogSection from "../components/blog/NewBlogSection"
import Files from "../components/Files"
import Stats from "../components/Stats"

import Dashboard from "../components/Dashboard"

import UserList from "../components/user/UserList"
import NewUser from "../components/user/NewUser"
import UserEdit from "../components/user/UserEdit"

import NotFoundRoute from "../components/NotFound"

import Comments from "../components/Comment"


import Menu from "../components/menu/Menu"
import NewMenu from "../components/menu/NewMenu"
import MenuEdit from "../components/menu/MenuEdit"

import Generate from "../components/template/Generate"

import TemplatesList from "../components/template/TemplateList"
import Template from "../components/template/Template"
import TemplateEdit from "../components/template/TemplateEdit"

import config from "../config.js"
import Title from "../plugins/title.js"

import Custom from "../components/Custom.js"

class App extends React.Component {
constructor(props){
    super(props);
    this.state=({login: false})
}


componentDidMount(){
  this.changeTitle()
}

componentWillMount(){
   axios.get(config().api_domain+'/verify/'+localStorage.getItem("apikey")+'').then(function (response) {
     this.setState({login: true})
  }.bind(this)).catch(function (response) {
     this.setState({login: false})
  }.bind(this));

}

changeTitle(){
 var suffix = " | Drojd CMS"
    var title = "";
  if(!Title[window.location.pathname.replace("/cms-admin/","")]){
    title = ""
  }else{
    title = Title[window.location.pathname.replace("/cms-admin/","")]
  }
  if(window.location.pathname == "/cms-admin/"){
    title = "Dashboard"
  }
  if(!localStorage.getItem("apikey")){
    title = "Prosím, přihlaste se"
  }
  document.title = title + suffix;
}

  render() {
    return (
      <div id="container">
     {this.state.login == true ?  <Main/> : <Login/>}

     {this.state.login == true ? 
      <Locations onNavigation={this.changeTitle}>
        <Location path="/cms-admin/" handler={Dashboard}/>
        <Location path="/cms-admin/login" handler={Login} />
        <Location path="/cms-admin/blog" handler={BlogList} />
        <Location path="/cms-admin/blog/new" handler={NewBlog} />
        <Location path="/cms-admin/blog/edit/:id" handler={BlogEdit} />  

        <Location path="/cms-admin/page" handler={PageList} />
        <Location path="/cms-admin/page/new" handler={NewPage} />
        <Location path="/cms-admin/page/edit/:id" handler={PageEdit} />
        <Location path="/cms-admin/files" handler={Files} />
        <Location path="/cms-admin/blog/section" handler={BlogSectionList} />
        <Location path="/cms-admin/blog/section/new" handler={NewBlogSection} />
        <Location path="/cms-admin/blog/section/edit/:id" handler={BlogSectionEdit} />

        <Location path="/cms-admin/users" handler={UserList} />
        <Location path="/cms-admin/stats" handler={Stats} />
        <Location path="/cms-admin/login" handler={Login} />
        <Location path="/cms-admin/comments" handler={Comments} />

        <Location path="/cms-admin/users/new" handler={NewUser} />

        <Location path="/cms-admin/users/edit/:id" handler={UserEdit} />
        <Location path="/cms-admin/menu" handler={Menu} />
        <Location path="/cms-admin/menu/new" handler={NewMenu} />

        <Location path="/cms-admin/menu/edit/:id" handler={MenuEdit} />
        <Location path="/cms-admin/generate" handler={Generate} />
        <Location path="/cms-admin/template" handler={TemplatesList} />
        <Location path="/cms-admin/template/new" handler={Template} />
        <Location path="/cms-admin/template/:id" handler={TemplateEdit} />
        <Location path="/custom" handler={Custom} />

        <Location path="/*" handler={NotFoundRoute} />
      </Locations>
      : null}
       
     </div>
    )
  }
}

ReactDOM.render( <App config={window._sharedData}/>, document.getElementById('app'));
  


