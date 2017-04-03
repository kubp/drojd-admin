import React from "react";


var Chart = require("chart.js")
Chart.defaults.global.responsive = true;
var LineChart = require("react-chartjs").Line;




class Graph extends React.Component {
constructor(props){
    super(props);
    this.getData = this.getData.bind(this);

 }

getData(){
		var data = {
    labels: this.props.labels || [],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: this.props.data || []
        }
    ]
}
return data;
}

render() {
    return <LineChart data={this.getData()}  height="80" redraw/>
  }
}






module.exports=Graph;