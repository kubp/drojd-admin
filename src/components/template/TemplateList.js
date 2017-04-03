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
}




componentWillMount(){

	axios.get(config().api_domain+'/template',   { headers: 
    { 
       'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
console.log(response.data)
	  this.setState({posts:response.data})
  }.bind(this))
}

  render() {
    var that = this;
    return (
        <div>
 <div id="section-name">
<h1>Šablony</h1>
</div>

        <div id="content">
  <div className="wrapper">
    <div className="row">
      <div className="col-1">
       <span> <Link href="/cms-admin/template/new"><button>Vytvořit šablonu</button></Link></span>
     

      <table className="table">
        <tbody>
          <tr>
             <th>Akce</th>
            <th>Šablona</th>

          </tr>
              {this.state.posts.map(function(result) {
           return <PageList data={result} key={result._id}/>;
        })}
        </tbody>
        </table>

</div>
  
    </div>
  
  </div>


</div>
{this.state.errorMessage == 1 ? <div className="message">Stránka byla úspěšně vytvořena</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
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
             <span><Link href={"/cms-admin/template/"+this.props.data._id}><i className="fa fa-arrow-down"></i></Link></span>
            </td>
            <td>{this.props.data.file}</td>
       
          
          </tr>
        
       )
  }

 
}







module.exports=Blog;