import React from "react";
import axios from "axios";
import marked from "marked";


var Link = require('react-router-component').Link



class Main extends React.Component {
constructor(props){
    super(props);

}


logout(){
    localStorage.setItem("apikey", "");
    window.location.replace("/cms-admin/");
}

  render() {
    return (
    <div id="top">
     	<div id="navbar">
		<span className="logo">Drojd CMS

		<a href=""><i className="fa fa-cogs"></i></a>
	<a href="#logut" onClick={this.logout}><i className="fa fa-sign-out"></i></a>
		</span>


	</div>
      	<div id="topmenu">

<nav>
<ul>

<li>
<Link href="/cms-admin/">
<i className="fa fa-tachometer"></i>
<span>Hlavní panel</span>
</Link>
</li>

<li>
<Link href="/cms-admin/page">
<i className="fa fa-book"></i>
<span>Stránky</span>
</Link>
</li>

<li>
<Link href="/cms-admin/blog">
<i className="fa fa-comment"></i>
<span>Blog</span>
</Link>
</li>

<li>
<Link href="/cms-admin/blog/section">
<i className="fa fa-folder"></i>
<span>Sekce Blogu</span>
</Link>
</li>

<li>
<Link href="/cms-admin/comments">
<i className="fa fa-comment-o"></i>
<span>Komentáře</span>
</Link>
</li>

<li>
<Link href="/cms-admin/stats">
<i className="fa fa-bar-chart"></i>
<span>Statistiky</span>
</Link>
</li>

<li>
<Link href="/cms-admin/users">
<i className="fa fa-user"></i>
<span>Uživatelé</span>
</Link>
</li>


<li>
<Link href="/cms-admin/menu">
<i className="fa fa-bars"></i>
<span>Menu</span>
</Link>
</li>



<li>
<a href="#">
<i className="fa fa-random"></i>
<span>Pokročilé</span>
</a>

<ul>

<div>
  <li>
<Link href="/cms-admin/template">

<span>Šablony</span>
</Link>
</li>

  <li>
  <Link href="/cms-admin/generate">

  <span>Statické soubory</span>
  </Link>
  </li>

  <li>
  <Link href="/cms-admin/files">

  <span>Soubory</span>
  </Link>
  </li>
</div>

</ul>

</li>

<div className="clear"></div>
</ul>
</nav>
</div>



</div>


       )
  }


}









module.exports=Main;
