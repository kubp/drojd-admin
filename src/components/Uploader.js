import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../config.js"
var Dropzone = require('react-dropzone');


class Uploader extends React.Component {
constructor(props){
    super(props);
    this.state = {files:[], uploaded:0, api_files:[]};

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.copy = this.copy.bind(this);
     this.imageDelete = this.imageDelete.bind(this);
 }




onDrop(files) {
  var file = files[0];
  this.setState({files:files})

}


componentWillMount(){
   axios.get(config().api_domain+'/image',
     { headers: { 'x-access-token': localStorage.getItem("apikey") }}).then(function (response) {
    this.setState({api_files: response.data})

  }.bind(this))

 }


upload(evt){

for(var i=0; i < this.state.files.length; i++){
  var data = new FormData();
 data.append('file', this.state.files[i]);



  axios.post(
  config().api_domain+'/image?apikey='+localStorage.getItem("apikey") +'',

 data, { headers: { 'Content-Type':  'multipart/form-data'}  },


).then(function (response) {

  var f = this.state.api_files;
  f.push(response.data.file)
  this.setState({api_files:f})
  this.setState({uploaded:i})
}.bind(this))


}

}


copy(evt){

console.log(evt.target.name)
this.refs.copied.value="/images/"+evt.target.name
this.refs.copied.select();
//this.refs.email.select()
 document.execCommand("copy");
}


imageDelete(file){
  console.log(file)
  axios.delete(
  config().api_domain+'/image/'+file+'?apikey='+localStorage.getItem("apikey") +'',

 { headers: { 'x-access-token': localStorage.getItem("apikey") }},


).then(function (response) {

  var f = this.state.api_files;

  var i = f.indexOf(file);
  if(i != -1) {
    f.splice(i, 1);
  }
  this.setState({api_files:f})


}.bind(this))



}







  render() {
    return (
      <div>

<input ref="copied" className="none"/>

      <div id="form">
 <Dropzone className="upload-box" activeClassName="upload-box-active" onDrop={this.onDrop}>

                {this.state.files.length > 0 ? <div className="fix-height">


  <div className="image-preview">{this.state.files.map((file) =>
    <img src={file.preview}/>)}</div>

        </div> :    <div> <div>Přetáhněte soubory k nahrání</div>
              <span>nebo klikněte sem</span></div>}


            </Dropzone>

     </div>
<br/>
<button onClick={this.upload}>Nahrát</button>




<table className="table">
        <tbody>
          <tr>
            <th>Akce</th>
            <th>Název souboru</th>
            <th>Náhled</th>
          </tr>

        {this.state.api_files.map((file) =>
          <tr>
            <td> <span className="icon page-more" onClick={this.imageDelete.bind(this, file)}><i className="fa fa-times"></i></span></td>
            <td><input className="no-input" name={file} onClick={this.copy} defaultValue={file}/></td>
            <td><img width="50" src={config().api_domain+"/../images/"+file}/></td>
          </tr>
        )}

      </tbody>
     </table>
</div>

      )
  }




}









module.exports=Uploader;
