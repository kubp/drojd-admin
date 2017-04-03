import React from "react";
import axios from "axios";
import marked from "marked";
var Link = require('react-router-component').Link
import config from "../../config.js"

var querystring = require('querystring');


class Blog extends React.Component {
constructor(props){
    super(props);
	  this.state = {
	  	pages:[],
      sort: "created_at",
      order: -1,
      page: 0,
      q:"sort:created_at order:-1 page:0"
	  }
	    this.deletePage = this.deletePage.bind(this);
      this.apiSort = this.apiSort.bind(this);
      this.query = this.query.bind(this);
       this.queryChange = this.queryChange.bind(this);
      this.paginator = this.paginator.bind(this);
}

componentDidMount(){
  document.title = "Stránky";
}

deletePage(r){

    axios.delete(config().api_domain+'/page/'+r._id+'',
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': localStorage.getItem("apikey")  }},)
     .then(function (response) {


  }.bind(this))

    this.state.pages.splice(this.state.pages.indexOf(r), 1)
    this.setState({pages: this.state.pages})
}

apiSort(page, sort, order){
  axios.get(config().api_domain+'/page?q=page:type&per_page=15&page='+page+'&sort='+sort+':'+order+'')
  .then(function (response) {
  this.setState({pages:response.data})
  }.bind(this))
}

componentWillMount(){
  this.apiSort(this.state.page, this.state.sort, this.state.order)
}


// var hasOrder = sort.match('^([a-z-_]+):(1|-1)$')


query(e){

  this.setState({q:e.target.value})



}

queryChange(){
if(this.state.q.match(/((page):[0-9\-1]+)/g)){
  var page = this.state.q.match(/((page):[0-9\-1]+)/g)[0].split(":")[1];
  this.setState({page: parseInt(page)})
}

if(this.state.q.match(/((order):[0-9\-1]+)/g)){
  var order = this.state.q.match(/((order):[0-9\-1]+)/g)[0].split(":")[1];
   this.setState({order: parseInt(order)})
}


if(this.state.q.match(/((sort):[a-z_]+)/g)){
  var sort = this.state.q.match(/((sort):[a-z_]+)/g)[0].split(":")[1];
  this.setState({sort: sort})
}

this.apiSort(page, sort, order)

//console.log(this.state.q.match(/((page):[0-9])/g)[0].split(":")[1])
//console.log(this.state.q.match(/((order):[0-9])/g)[0].split(":")[1])
//console.log(this.state.q.match(/((sort):[a-z_]+)/g)[0].split(":")[1])

}


changeSort(item){
  var order = this.state.order;
if(this.state.sort==item){
    if(this.state.order==1){
      this.setState({order:-1})
      order=-1;
    }else{
      this.setState({order:1})
      order=1;
    }
  }

  this.setState({sort:item})

 this.refs.q.value="sort:"+item+" order:"+order+" page:"+this.state.page+"";
 this.apiSort(this.state.page, item, order)
}

paginator(d){
  var page=this.state.page;

  if(d==1){
    this.setState({page: this.state.page+1})
    page=page+1;
  }else if(page > 0){

    this.setState({page: this.state.page-1})
    page=page-1;
  }
   this.refs.q.value="sort:"+this.state.sort+" order:"+this.state.order+" page:"+(page)+"";
this.apiSort(page,this.state.sort, this.state.order)
}


  render() {
    var that = this;
    return (
 <div>
 <div id="section-name">
<h1>Stránky</h1>
</div>

        <div id="content">
  <div className="wrapper">
    <div className="row">
      <div className="col-1">
       <span> <Link href="/cms-admin/page/new"><button>Vytvořit stránku</button></Link></span>
       <span> <input className="q input" type="text" onChange={this.query} onBlur={this.queryChange} defaultValue={this.state.q} ref="q"></input></span>
        <span> <button onClick={this.paginator.bind(this,-1)}>Předchozí strana</button></span>
        <span> <button onClick={this.paginator.bind(this,1)}>Další stana</button></span>

      <table className="table">
        <tbody>
          <tr className="table-head">
    	      <th>Action</th>
      <th onClick={this.changeSort.bind(this, "title")}>Titulek
     {this.state.sort =="title" && this.state.order==1 ? <i className="fa fa-arrow-down sort"></i> : null}
     {this.state.sort =="title" && this.state.order==-1 ? <i className="fa fa-arrow-up sort"></i> : null}
    </th>

    <th onClick={this.changeSort.bind(this, "url")}>Url
     {this.state.sort =="url" && this.state.order==1 ? <i className="fa fa-arrow-down sort"></i> : null}
     {this.state.sort =="url" && this.state.order==-1 ? <i className="fa fa-arrow-up sort"></i> : null}
    </th>

      <th onClick={this.changeSort.bind(this, "created_at")}>Datum
     {this.state.sort =="created_at" && this.state.order==1 ? <i className="fa fa-arrow-down sort"></i> : null}
     {this.state.sort =="created_at" && this.state.order==-1 ? <i className="fa fa-arrow-up sort"></i> : null}
    </th>


	        </tr>
              {this.state.pages.map(function(result) {
           return <PageList onClick={that.deletePage.bind(null, result)} data={result} key={result._id}/>;
        })}
        </tbody>
        </table>

</div>

    </div>

  </div>


</div>
</div>
       )
  }


}



class PageList extends React.Component {
constructor(props){
    super(props);

}
date(d){
 var date = new Date(d)
var date =date.getDate() + "." + (date.getMonth()+1)+"."+date.getFullYear()
return date
}


  render() {
    return (
          <tr>
            <td>
          <span className="icon page-remove" onClick={this.props.onClick}><i className="fa fa-times" title="Smazat"></i></span>
          <span className="icon page-remove">
          <Link href={"/cms-admin/page/edit/"+this.props.data._id}><i className="fa fa-arrow-down"  title="Upravit"></i></Link></span>
       {this.props.data.visible==1 ?
        <span className="icon page-more icon-active"><i className="fa fa-check" title="Skrýt"></i></span>
        :<span className="icon page-more"><i className="fa fa-check" title="Publikovat"></i></span>
      }

        </td>
            <td>{this.props.data.title}</td>
            <td>{this.props.data.url}</td>
           <td>{this.date(this.props.data.created_at)}</td>
          </tr>

       )
  }


}







module.exports=Blog;
