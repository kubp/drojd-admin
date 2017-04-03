import React from "react";
import axios from "axios";
import marked from "marked";


var querystring = require('querystring');

import Uploader from "./Uploader"

var Dropzone = require('react-dropzone');


class Login extends React.Component {
constructor(props){
    super(props);
    this.copy = this.copy.bind(this);
 }



copy(evt){

this.refs.email.select()
 document.execCommand("copy");
}

  render() {
    return (
<div>
  <div id="section-name">
    <h1>Soubory</h1>
  </div>
  <div id="content">
    <div className="wrapper">
      <div className="row">
        <div className="col-1">
          <Uploader/>
        </div>
      </div>
    </div>
  </div>
</div>
      )
  }

 
}



module.exports=Login;