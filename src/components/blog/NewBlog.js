import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import Editor from "./../Editor"
import config from "../../config.js"
import webalize from "./../webalize"
import Uploader from "./../Uploader"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {
      title:"",
      url:"",
      sections:[],
      edit:"",
      comments: true,
      visible: 1,
      layout: "Blog"
    };
    this.handleChange = this.handleChange.bind(this);
     this.edit = this.edit.bind(this);

  this.axiosSend = this.axiosSend.bind(this);
  this.url = this.url.bind(this);
  }

  url(evt){
    var index = 0;
    for(var i=0; i < this.state.sections.length; i++){
      if(this.state.sections[i].section==this.state.section){
        index = i;
      }
    }
  this.setState({url: (this.state.sections[index].url+"/").replace("//","/")+webalize(evt.target.value)})
  this.setState({title:evt.target.value})
}



  componentWillMount(){

    axios.get(
  config().api_domain+'/page?q=blog_section:type',
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }},
).then(function (response) {

  console.log(response.data)
  this.setState({sections: response.data, section: response.data[0].section})


}.bind(this))
  


  }



  edit(md,raw){
    this.setState({code_raw: raw})
    this.setState({code_md: md})

}



  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }

  rawMarkup(evt) {
    var rawMarkup = marked(evt.target.value.toString());
    //return { __html: rawMarkup };
    this.setState({code_raw: rawMarkup})
    this.setState({code_md: evt.target.value.toString() })
  }



  axiosSend(){
     axios.post(
  config().api_domain+'/page',
       querystring.stringify({
            title: this.state.title,
            description:this.state.description,
            headline:this.state.headline,
            perex: this.state.perex,
            tags: this.state.tags,
            author: this.state.author,
            raw_content:this.state.code_raw,
            md_content: this.state.code_md,
            url:this.state.url,
            section:this.state.section,
            image: this.state.image,
            visible: this.state.visible,
            comments: this.state.comments,
            layout:this.state.layout,
            type:"post"
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
<h1>Blog / Nový příspěvek</h1>
</div>
<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1">


<div>
<div className="group">
 <label>Title</label>
 <span><input type="text" value={this.state.title} name="title" onChange={this.url}/></span>
</div>

<div className="group">
 <label>sekce</label>
     <span>
       <select name="section" onChange={this.handleChange}>
   
    {this.state.sections.map((section) => 
      <option key={section._id} value={section.section}>{section.section}</option>

      )}
  </select>
  

</span>
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
 <label>Perex</label>
 <span><input type="text" value={this.state.perex} name="perex" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Obrázek</label>
 <span><input type="text" value={this.state.image} name="image" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Autor</label>
 <span><input type="text" value={this.state.author} name="author" onChange={this.handleChange}/></span>
</div>

<div className="group">
 <label>Tagy</label>
 <span><input type="text" value={this.state.tags} name="tags" onChange={this.handleChange}/></span>
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
       <select name="visible" onChange={this.handleChange}>
    <option value="1">Zveřejněné</option>
    <option value="0">Neveřejněné</option>
  </select>

</span>
</div>


<div className="group">
 <label>Komentáře</label>
     <span>
       <select name="comments" onChange={this.handleChange}>
    <option value="true">Povoleny</option>
    <option value="false">Zakázány</option>
  </select>

</span>
</div>




 <div className="group">
 <label></label>
 <span><button onClick={this.axiosSend}>Vytvořit příspěvek</button></span>

 </div>
     
     
      </div>
</div>
  
    </div>
  
  </div>
</div>
{this.state.errorMessage == 1 ? <div className="message">Příspěvek byl vytvořen</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
</div>

      )
  }

 
}









module.exports=Blog;