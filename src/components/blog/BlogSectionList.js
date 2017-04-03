import React from "react";
import axios from "axios";
import marked from "marked";
var Link = require('react-router-component').Link
import config from "../../config.js"

var querystring = require('querystring');


class Blog extends React.Component {
constructor(props){
    super(props);
	  this.state = {
	  	posts:[]
	  }
	   this.deletePage = this.deletePage.bind(this);
}


deletePage(r){

    axios.delete(config().api_domain+'/page/'+r._id+'',
       { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
       'x-access-token': localStorage.getItem("apikey")  }})
       .then(function (response) {
   


  }.bind(this))
  this.state.posts.splice(this.state.posts.indexOf(r), 1);
  this.setState({posts: this.state.posts});
}


componentWillMount(){

	axios.get(config().api_domain+'/page?q=blog_section:type')
  .then(function (response) {
    this.setState({posts:response.data})
  }.bind(this))
}

  render() {
    var that = this;
    return (
      <div>
 <div id="section-name">
<h1>Sekce</h1>
</div>

        <div id="content">
  <div className="wrapper">
    <div className="row">
      <div className="col-1">
       <span> <Link href="/cms-admin/blog/section/new"><button>Vytvořit sekci</button></Link></span>
     

      <table className="table">
        <tbody>
          <tr>
             <th>Akce</th>
            <th>Titulek</th>
            <th>Popis</th>
            <th>Sekce</th>
          </tr>
              {this.state.posts.map(function(result) {
           return <PageList onClick={that.deletePage.bind(null, result)} data={result} key={result._id}/>;
        })}
        </tbody>
        </table>

</div>
  
    </div>
  
  </div>


</div>
</div>
       )
  }

 
}



class PageList extends React.Component {
constructor(props){
  super(props);
}


  render() {
   console.log(this.props.data)
    return (
       
	         <tr>
            <td>
          <span className="icon page-remove" onClick={this.props.onClick}><i className="fa fa-times"></i></span>
          <span className="icon page-remove">
          <Link href={"/cms-admin/blog/section/edit/"+this.props.data._id}><i className="fa fa-arrow-down"></i></Link></span>
       
             <span className="icon page-more"><i className="fa fa-check"></i></span>
        </td>
            <td>{this.props.data.title}</td>
            <td>{this.props.data.description}</td>
            <td>{this.props.data.section}</td>
          
          </tr>
        
       )
  }

 
}







module.exports=Blog;