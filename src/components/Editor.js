import React from "react";
import marked from "marked";

class Editor extends React.Component {
constructor(props){
    super(props);


    this.state=({editor: this.props.data, preview_mod:0,receive:0})
    this.rawMarkup = this.rawMarkup.bind(this);
    this.headline = this.headline.bind(this);
    this.addTag = this.addTag.bind(this);
     this.preview = this.preview.bind(this);
        this.keyPress = this.keyPress.bind(this);
 }

componentWillReceiveProps(){
//console.log(this.props.data)
//   this.setState({editor: this.props.data})



}

  rawMarkup(evt) {
    var lines = evt.target.value.toString().split("\n").length;
    var rawMarkup = marked(evt.target.value.toString());

    if(lines>4){
      evt.target.rows=lines;
    }


    this.setState({editor: evt.target.value.toString()})
    this.setState({start: evt.target.selectionStart})
    this.setState({end: evt.target.selectionEnd})

    var rawMarkup = marked(evt.target.value.toString());
    this.setState({code_raw: rawMarkup})
    this.props.change(this.state.editor, this.state.code_raw)
}

  headline(evt){


    var line = this.state.editor.substr(0, this.state.start).split("\n").length;
    var line_array =(this.state.editor.split("\n"))
    var h = this.state.editor.split("\n")[line-1];


     if(h.substring(0,evt.target.name.length)==evt.target.name){
      h=h.replace(evt.target.name+" ","");
     }else{
      h=evt.target.name+" "+h;
     }

    line_array[line-1]=h;
    var result = line_array.join("\n")

    //this.setState({editor: result})

    this.refs.editor.value=result;
    //this.setState({editor: result})
    this.refs.editor.focus();


      this.refs.editor.selectionStart = this.state.start+evt.target.name.length+1;
    this.refs.editor.selectionEnd = this.state.start+evt.target.name.length+1;

  }

  addTag(evt){


    var before = this.state.editor.substring(0,this.state.start)
    var after = this.state.editor.substring(this.state.end, this.state.editor.length)
    var text =(this.state.editor.substring(this.state.start,this.state.end))

    var md_tag = evt.target.name;

    if(md_tag=="href"){
     var result = before + "[" + text +"](http://)" + after;

     var selection_start=this.state.start+3+text.length;
     var selection_end =this.state.end+10;

    }else if(md_tag=="img"){
   var selection_start=this.state.start+4+text.length;
     var selection_end =this.state.end+11;

      var result = before +text+ "![](http://)" + after;
    }else{

         var selection_start=this.state.start+evt.target.name.length;
     var selection_end =this.state.end+evt.target.name.length;
     var result = before + md_tag + text + md_tag + after;
    }

    //hackz one
    this.refs.editor.value=result;
    //this.setState({editor: result})
    this.refs.editor.focus();

    this.refs.editor.selectionStart = selection_start;
    this.refs.editor.selectionEnd = selection_end;


  }

  preview(evt){
    this.state.preview_mod==0 ? this.setState({preview_mod:1}) : this.setState({preview_mod:0})

  }

keyPress(evt){

if(evt.key=="Enter"){
  var line = this.state.editor.substr(0, this.state.start).split("\n").length;

  var line_array =(this.state.editor.split("\n"))

  if(line_array[line-2][0]=="-"){
  line_array[line-1]=line_array[line-1]+"- "

   var result = line_array.join("\n")
  this.setState({editor: result})
  }


}
}


  render() {
    return (
      <div>
      <button name="#" onClick={this.headline}>H1</button>
      <button name="##" onClick={this.headline}>H2</button>
      <button name=">" onClick={this.headline}>q</button>
      <button name="1. " onClick={this.headline}>li</button>
      <button name="- " onClick={this.headline}>-</button>

      <button name="*" onClick={this.addTag}>/</button>
      <button name="**" onClick={this.addTag}>B</button>
      <button name="href" onClick={this.addTag}>href</button>
      <button name="img" onClick={this.addTag}>img</button>
      <button name="`" onClick={this.addTag}>code</button>

      <button onClick={this.preview}>Preview</button>

      {this.state.preview_mod == 0 ? <textarea ref="editor" className="edit" rows="4" cols="50" name="code"
      onChange={this.rawMarkup} onClick={this.rawMarkup} value={this.state.editor} onKeyUp={this.keyPress}></textarea>
      : <div className="edit preview" dangerouslySetInnerHTML={{__html: this.state.code_raw}} />}
      </div>
       )
  }




}









module.exports=Editor;
