import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../config.js"

import LineGraph from "./LineGraph"

class Login extends React.Component {
constructor(props){
    super(props);
    this.state = {};

 }

componentWillMount(){

axios.get(config().api_domain+'/stats/monthly',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
   var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

console.log(response.data)

var d = new Date();
var n = d.getMonth();

   var count = [];
   var month = [];
   for(var i=0; i<response.data.length; i++){
     
      if(n== response.data[i].month-1){
     this.setState({monthly:response.data[i].count})
      }
      count[i]=response.data[i].count
      month[i]=monthNames[response.data[i].month-1]
   }


    this.setState({
      count: count,
      month: month

    })
}.bind(this))




axios.get(config().api_domain+'/stats/monthly',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
   var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

   var count = [];
   var month = [];
   for(var i=0; i<response.data.length; i++){
      count[i]=response.data[i].count
      month[i]=monthNames[response.data[i].month-1]
   }


    this.setState({
      count: count,
      month: month

    })
}.bind(this))

var date = new Date();
var month = date.getMonth()+1;
var year = date.getFullYear();

axios.get(config().api_domain+'/stats/daily?start='+year+'-'+month+'-01&end='+year+'-'+month+'-30',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
  this.setState({
      today: response.data.count
  })
}.bind(this))


axios.get(config().api_domain+'/stats/unique',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
  this.setState({
      unique: response.data.count
  })
}.bind(this))


axios.get(config().api_domain+'/stats/daily?start='+year+'-01-01&end='+(year+1)+'-01-01',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }})
  .then(function (response) {
  this.setState({
      yearly: response.data.count
  })
}.bind(this))


}





  render() {
    return (
        <div>
 <div id="section-name">
<h1>Statistiky</h1>
</div>
     <div id="content">
<div className="wrapper">


<div className="row">
  <div className="col-1-4">
    <div>
      <h2>Počet dnes</h2>
      <h1>{this.state.today}</h1>
    </div>
  </div>

   <div className="col-1-4">
    <div>
      <h2>Počet měsíčně</h2>
      <h1>{this.state.monthly}</h1>
    </div>
  </div>

   <div className="col-1-4">
    <div>
      <h2>Unikátních</h2>
      <h1>{this.state.unique}</h1>
    </div>
  </div>

   <div className="col-1-4">
    <div>
      <h2>Ročně</h2>
      <h1>{this.state.yearly}</h1>
    </div>
  </div>
    
</div>


<div className="row">
<div className="col-1">


<div>
<h1>Graf přístupů - měsíčně</h1>

<LineGraph labels={this.state.month} data={this.state.count}/>
     
     
      </div>
</div>
  
    </div>
  
  </div>


</div>
</div>

      )
  }

 

 
}









module.exports=Login;