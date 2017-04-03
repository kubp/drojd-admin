import React from "react";
import axios from "axios";
import marked from "marked";
import config from "../config.js"

var Link = require('react-router-component').Link



class Main extends React.Component {
constructor(props){
    super(props);
    this.state={}
}


  render() {
    return (

    <div>
 <div id="section-name">
<h1>Hlavní panel</h1>
</div>
<div id="content">
<div className="wrapper">
<div className="row">
<div className="col-1-2">

<h2>Vítejte na Drojd CMS</h2>

<p>Jednoduché obrázkové návody vám pomůžou se systémem lépe pracovat</p>


</div>

<div className="col-1-2">

<h1>Markdown nápověda</h1>
<p>Trocha nápovědy pro editor</p>
<h2>Nadpisy různých úrovní</h2>

<div className="code">
 # Nadpis první úrovně<br/>
 ## Nadpis druhé úrovně<br/>
 ### Nadpis třetí úrovně<br/>
</div>

<h2>Zvýraznění textu</h2>

<div className="code">
 > Citace<br/>
 *kurzíva*<br/>
 **tučně**<br/>
~~přeškrtnuté~~
</div>

<h2>Seznamy</h2>

<div className="code">
1. číslovaný seznam<br/>
2. číslovaný seznam<br/>
- odrážkový seznam<br/>
- odrážkový seznam<br/>

</div>


<h2>Odkazy a obrázky</h2>

<div className="code">
[Odkaz](https://www.google.com)<br/>
![popis obrázku](obrazek.png")<br/>

</div>


</div>

    </div>

  </div>
</div>

</div>


       )
  }


}









module.exports=Main;
