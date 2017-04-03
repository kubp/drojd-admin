import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../../config.js"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {
      title:"",
      url:"",
      layout: "BlogSection"
    };
    this.handleChange = this.handleChange.bind(this);

  this.axiosSend = this.axiosSend.bind(this);
  }

  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }

  axiosSend(){
     axios.post(
  config().api_domain+'/page',
       querystring.stringify({
          title: this.state.title,
          description:this.state.description,
          headline:this.state.headline,
          author: this.state.author,
          url:this.state.url,
          section:this.state.section,
          layout:this.state.layout,
          type: "blog_section",
          visible: 1
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
<h1>Sekce / Nová Sekce</h1>
</div>
<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1">


<div>
<div className="group">
 <label>Titulek</label>
 <span><input type="text" value={this.state.title} name="title" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Url</label>
 <span><input type="text" value={this.state.url} name="url" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Nadpis</label>
 <span><input type="text" value={this.state.headline} name="headline" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Popis</label>
 <span><input type="text" value={this.state.description} name="description" onChange={this.handleChange}/></span>
</div>
  
  <div className="group">
 <label>Author</label>
 <span><input type="text" value={this.state.author} name="author" onChange={this.handleChange}/></span>
</div>
  

  <div className="group">
 <label>Sekce</label>
 <span><input type="text" value={this.state.section} name="section" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Šablona</label>
 <span><input type="text" value={this.state.layout} name="layout" onChange={this.handleChange}/></span>
</div>

  

 <div className="group">
 <label></label>
 <span><button onClick={this.axiosSend}>Vytvořit sekci</button></span>

 </div>  
     
      </div>
</div>
  
    </div>
  
  </div>
</div>
{this.state.errorMessage == 1 ? <div className="message">Sekce byla vytvořena</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
</div>
      )
  }

 
}



module.exports=Blog;