import React from "react";
import axios from "axios";
import marked from "marked";

import config from "../../config.js"

var querystring = require('querystring');

import Uploader from "../Uploader"

var Dropzone = require('react-dropzone');


class Login extends React.Component {
constructor(props){
    super(props);
    this.state = {generated:0}
    this.generate = this.generate.bind(this);
 }


generate(){

  axios.get(config().api_domain+'/static/generate',
       { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
       'x-access-token': localStorage.getItem("apikey")  }})
       .then(function (response) {
          console.log(response)
          this.setState({generated:1})

  }.bind(this))

}



  render() {
    return (
      <div>







 <div id="section-name">
<h1>Statické soubory</h1>
</div>

        <div id="content">
  <div className="wrapper">
    <div className="row">
      <div className="col-1">
      
      <h3>Generování souborů</h3>
      <p>Tato stránka generuje z CMS statické soubory. Ty se poté dají stáhnout jako zip. A nahrát na jakýkoliv web.
      Stačí aby web podporoval statické soubory html.</p><br/>
<button onClick={this.generate}>Vygenerovat</button> 
{this.state.generated ==1 ?
 <i className="fa fa-check icon-active" style={{"marginLeft":"10px"}}></i>
: null}

<h3>Stažení vygenerovaných souborů</h3>
<a href={config().api_domain+"/static/download?apikey="+localStorage.getItem("apikey")+""}><button>Stáhnout</button></a>


 
</div>

</div>


</div>
</div>
</div>
      )
  }

 

 
}









module.exports=Login;