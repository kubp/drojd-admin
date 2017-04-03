import React from "react";
import axios from "axios";
import marked from "marked";

import config from "../../config.js"

var querystring = require('querystring');

class Template extends React.Component {
constructor(props){
    super(props);
    this.state = {jsx:"", html:"", generate:0}
    this.generate = this.generate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendHTML = this.sendHTML.bind(this);
    this.axiosSend = this.axiosSend.bind(this);
 }



componentWillMount(){
  axios.get(config().api_domain+'/template/'+this.props.id+'?apikey='+localStorage.getItem("apikey") )
    .then(function (response) {
      this.setState({
        jsx: response.data[0].jsx,
        html:response.data[0].html,
        id:response.data[0]._id,
        file:response.data[0].file,

      })
  }.bind(this))

}


axiosSend(){
this.setState({errorMessage:0})
  axios.put(
  config().api_domain+'/template/'+this.props.id+'',
       querystring.stringify({
             jsx: this.state.jsx,
          html:this.state.html,
          file:this.state.file
       
      }),
   { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }},
).then(function (response) {
    this.setState({errorMessage:1})
  }.bind(this))
  .catch(function (response) {
      this.setState({errorMessage:2})
  }.bind(this));

}



sendHTML(){
    axios.get(config().api_domain+'/generator/live',
      {
    params: {
      html: this.state.html,
      tags: this.state.tags,
      apikey: localStorage.getItem("apikey") 
    }
  }
         
        
   )
       .then(function (response) {
          console.log(response)
          this.setState({jsx:response.data.data})

  }.bind(this)).catch(function (response) {
    console.log("nope")
  }.bind(this));
  

}


generate(){
   this.setState({generate:1})
    axios.get(config().api_domain+'/generator/move',
 {
    params: {
   
      apikey: localStorage.getItem("apikey") 
    }
  }
   )
       .then(function (response) {
        this.setState({generate:2})
          

  }.bind(this)).catch(function (response) {
    console.log("nope")
  }.bind(this));
  
}



 handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }


  render() {
    return (
      <div>


 <div id="section-name">
<h1>Upravit šablonu</h1>
</div>

        <div id="content">
  <div className="wrapper">
    <div className="row">
      <div className="col-1-2">
    <p>HTML stránka</p><br/>
 <textarea onChange={this.handleChange} value={this.state.html} name="html" className="edit" rows="4" cols="50"></textarea>
 <button onClick={this.sendHTML}>Live</button>
   <button onClick={this.generate}>Vygenerovat</button>

{this.state.generate == 2 ? <i className="fa fa-check icon-active" style={{"marginLeft": "5px"}}></i>: null}
{this.state.generate == 1 ? <i className="fa fa-refresh fa-spin fa-fw icon-active" style={{"marginLeft": "5px"}}></i>: null}

</div>

<div className="col-1-2">
<p>Výsledný kod (změnou můžete způsobit nefunkčnost)</p><br/>
 <textarea onChange={this.handleChange} value={this.state.jsx} name="jsx" className="edit" rows="4" cols="50"></textarea>
 
</div>

</div>

    <div className="row">
      <div className="col-1">

<div className="group w-a">
 <label>Název šablony</label>
 <span><input type="text" disabled='disabled' value={this.state.file} name="file"/></span>
</div>


 <div className="group">
 <label style={{width: "98px"}}></label>
 <span><button onClick={this.axiosSend}>Upravit šablonu</button></span>


 </div>

</div>


</div>




</div>
</div>
{this.state.errorMessage == 1 ? <div className="message">Šablona byla úspěšně vytvořena</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
</div>
      )
  }

 

 
}









module.exports = Template;