import express from "express";
import React from "react";

const app = express();


// set up Jade
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/../public'));

app.get('*', function(req, res) {

  res.render('index');

})



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
