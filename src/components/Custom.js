import React from "react";
import axios from "axios";
import marked from "marked";
var Link = require('react-router-component').Link
import config from "../config.js"

var querystring = require('querystring');
var revalidator = require('revalidator');

class Blog extends React.Component {
constructor(props){
    super(props);
	  this.state = {
	  	//data: [{test: "das"}, {test: "sas"}, {da: "asd"}]
      data: ["asd","asd"]
	  }

    this.handleChange = this.handleChange.bind(this);

}



  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
      var f = revalidator.validate(this.state, {
    properties: {
      mail: {
        description: 'the url the object should be stored at',
          type: 'string',
          format: "email",
        required: true
      },
      pass: {
        description: 'the url the object should be stored at',
          type: 'string',
          minLength: 8
      }
    }
  });

      console.log(f)

  }





  render() {
    var that = this;
    return (
        <div>
 <div id="section-name">
<h1>Custom</h1>
</div>

<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1">

<div className="group w-a">
 <label>Jméno</label>
 <span><input type="text" value={this.state.mail} name="mail" onChange={this.handleChange}/></span>
</div>

</div>
  
    </div>
  
  </div>


</div>
</div>
       )
  }

 
}






module.exports=Blog;