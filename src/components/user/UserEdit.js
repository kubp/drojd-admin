import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../../config.js"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);

  this.axiosSend = this.axiosSend.bind(this);
  }

componentWillMount(){
axios.get(config().api_domain+'/user/'+this.props.id+'',
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
    console.log(response.data);
    this.setState({
      mail: response.data.mail,
      permission:response.data.permission

   })
}.bind(this))


}


  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }




  axiosSend(){



     axios.put(
  config().api_domain+'/user/'+this.props.id+'',
       querystring.stringify({
           mail: this.state.mail,
            pass: this.state.pass,
            permission: this.state.permission
        

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



  render() {
    return (
      <div>
 <div id="section-name">
<h1>Uživatelé / Úprava Uživatele</h1>
</div>
<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1">


<div>
<div className="group">
 <label>Jméno</label>
 <span><input type="text" value={this.state.mail} name="mail" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Heslo</label>
 <span><input type="text" value={this.state.pass} name="pass" onChange={this.handleChange}/></span>
</div>



<div className="group">
 <label>práva</label>
     <span>
       <select name="permission" onChange={this.handleChange}>
    <option value="1">Uživatel</option>
    <option value="2">Administrátor</option>
  </select>

</span>
</div>


 <div className="group">
 <label></label>
 <span><button onClick={this.axiosSend}>Upravit uživatele</button></span>

 </div>  
     
      </div>
</div>
  
    </div>
  
  </div>
</div>
{this.state.errorMessage == 1 ? <div className="message">Uživatel byl upraven</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
</div>

      )
  }

 

 
}









module.exports=Blog;