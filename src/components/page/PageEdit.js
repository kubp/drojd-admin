import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import Editor from "./../Editor"
import config from "../../config.js"

class Blog extends React.Component {
constructor(props){
    super(props);
    this.state = {
      title:"",
      code:""
    };
    this.handleChange = this.handleChange.bind(this);

  this.axiosSend = this.axiosSend.bind(this);
   this.edit = this.edit.bind(this);
  }

  edit(md,raw){
    this.setState({code_raw: raw})
    this.setState({code_md: md})

}

componentDidMount(){
  document.title = "Editace stránky";
}

componentWillMount(){
  axios.get(config().api_domain+'/page/'+this.props.id+'')
    .then(function (response) {
      this.setState({
        title: response.data.title,
        description:response.data.description,
        code_raw:response.data.raw_content,
        code_md_editor: response.data.md_content,
        visible: response.data.visible,
        image: response.data.image,
        url:response.data.url,
        layout: response.data.layout

      })
  }.bind(this))

}


  handleChange(evt){
    var name=evt.target.name;
    this.setState({[evt.target.name] : evt.target.value})
    
  }





  axiosSend(){

    axios.put(
  config().api_domain+'/page/'+this.props.id+'',
       querystring.stringify({
         title: this.state.title,
          description:this.state.description,
          raw_content:this.state.code_raw,
          md_content:this.state.code_md,
          visible:  this.state.visible,
          image: this.state.image,
          layout: this.state.layout

    }),
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }},
).then(function (response) {
    this.setState({errorMessage:1})
  }.bind(this))
  .catch(function (response) {
      this.setState({errorMessage:2})
  }.bind(this));
  
  



axios.put(
  config().api_domain+'/page/'+this.props.id+'',
    querystring.stringify({
      url: this.state.url,
      visible: this.state.visible
  }),
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': localStorage.getItem("apikey")  }},
)
  

}


  render() {
    return (
      <div>
 <div id="section-name">
<h1>Stránky / Úprava stránky</h1>
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
     <span>
     {this.state.code_md_editor ?
     <Editor change={this.edit.bind(null)} data={this.state.code_md_editor}/>
     : null}
</span>
</div>


<div className="group">
 <label>Viditelnost</label>
     <span>
       <select name="visible" onChange={this.handleChange} value={this.state.visible}>
    <option value="0">Nezveřejněné</option>
    <option value="1">Zveřejněné</option>
  </select>

</span>
</div>


 <div className="group">
 <label></label>
 <span><button onClick={this.axiosSend}>Upravit stránku</button></span>


 </div>
     
     
      </div>
</div>
  
    </div>
  
  </div>


</div>
{this.state.errorMessage == 1 ? <div className="message">Stránka byla upravena</div>: null}
{this.state.errorMessage == 2 ? <div className="message error">Nastala chyba :(</div>: null}
</div>

      )
  }

 

 
}









module.exports=Blog;