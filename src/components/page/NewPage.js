import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import Editor from "./../Editor"
import config from "../../config.js"
import Uploader from "./../Uploader"
import webalize from "./../webalize"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {
      title:"",
      code:"",
      visible:1,
      layout:"Page"
    };
  this.handleChange = this.handleChange.bind(this);
  this.axiosSend = this.axiosSend.bind(this);
  this.edit = this.edit.bind(this);
  this.url = this.url.bind(this);
  }

url(evt){
  this.setState({url: "/"+webalize(evt.target.value)})
  this.setState({title:evt.target.value})
}

edit(md,raw){
  this.setState({code_raw: raw})
  this.setState({code_md: md})
}


  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }

componentDidMount(){
  document.title = "Nová stránka";
}


  axiosSend(){

    axios.post(
  config().api_domain+'/page',
       querystring.stringify({
         title: this.state.title,
          description:this.state.description,
          raw_content:this.state.code_raw,
          md_content:this.state.code_md,
          visible:  this.state.visible,
          image: this.state.image,
          url:this.state.url,
          layout:this.state.layout,
          type: "page"

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
      <div id="openModal" className="modalDialog">
    <div> <a href="#close" title="Close" className="close">X</a>

          <Uploader/>
    </div>
</div>
 <div id="section-name">
<h1>Stránky / Nová stránka</h1>
</div>
     <div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1">


<div>
<div className="group">
 <label>Titulek</label>
 <span><input type="text" value={this.state.title} name="title" onChange={this.url}/></span>
</div>

<div className="group">
 <label>Url</label>
 <span><input type="text" value={this.state.url} name="url" onChange={this.handleChange}/></span>
</div>


<div className="group">
 <label>Popis</label>
 <span><input type="text" value={this.state.description} name="description" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Obrázek</label>
 <span><input type="text" value={this.state.image} name="image" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Šablona</label>
 <span><input type="text" value={this.state.layout} name="layout" onChange={this.handleChange}/></span>
</div>


<div className="group">
 <label></label>
 <span><a href="#openModal">Galerie</a></span>
</div>


<div className="group">
 <label></label>
     <span>

     <Editor change={this.edit.bind(null)}/>

</span>
</div>


<div className="group">
 <label>Viditelnost</label>
     <span>
       <select name="visible" onChange={this.handleChange} value={this.state.visible}>
    <option value="1">Zveřejněné</option>
    <option value="0">Nezveřejněné</option>
    
  </select>

</span>
</div>


 <div className="group">
 <label></label>
 <span><button onClick={this.axiosSend}>Vytvořit stránku</button></span>


 </div>
     
     
      </div>
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









module.exports=Blog;