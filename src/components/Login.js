import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../config.js"

class Login extends React.Component {
constructor(props){
    super(props);
    this.state = {mail:"",pass:""};
     this.handleChange = this.handleChange.bind(this);
      this.axiosSend = this.axiosSend.bind(this);
 }

  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
  }


  axiosSend(){

this.setState({errorMessage:0})

axios.post( config().api_domain+'/login',

querystring.stringify({mail:this.state.mail,pass:this.state.pass}),
{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
).then(function (response) {
  localStorage.setItem("apikey", response.data.apikey);

  window.location.replace("/cms-admin/");
}.bind(this)).catch(function (response) {
  this.setState({errorMessage:2})
}.bind(this));

}

  render() {
    return (
        <div>
 <div id="section-name">
<h1>Administrace</h1>
</div>
<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1-2">

  <div id="form">


  <h1>Prosím, přihlaste se</h1>

    <div className="group n-l">
      <label>E-mail</label>
      <span><input type="text" value={this.state.mail} name="mail" onChange={this.handleChange}/></span>
    </div>

    <div className="group n-l">
      <label>Heslo</label>
      <span><input type="password" value={this.state.pass} name="pass" onChange={this.handleChange}/></span>
    </div>

    <div className="group n-l">
      <label></label>
      <span> <input type="submit" value="Přihlásit se" onClick={this.axiosSend}/></span>
    </div>


  </div>

  </div>

  </div>

  </div>
  </div>


{this.state.errorMessage == 2 ? <div className="message error">Zadaný E-mail nebo heslo je špatně</div>: null}


</div>




      )
  }




}









module.exports=Login;
