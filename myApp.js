var express = require('express');
var app = express();
require('dotenv').config();
let bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

console.log('Hello World');
app.get('/', function(req, res){
    absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);

});

app.use("/public", express.static(__dirname + "/public"));


app.get('/json', function(req, res){
    var data={"message":"Hello json"};
    if (process.env.MESSAGE_STYLE=="uppercase"){
       data.message=data.message.toUpperCase();
    }
  
    res.json(data);

    });


    app.get('/now', (request, response, next) => {
        request.time = new Date().toString()
        next()
      } , (request, response) => {
        response.json({'time' : request.time})
      });

      app.get('/:word/echo', (request, response) => {
        response.json({echo : request.params.word})
      });

      app.get("/name", (request, response) => {
        let string = request.query.first + " " + request.query.last;
        response.json({ name: string });
      });


      app.post(
        "/name",
        bodyParser.urlencoded({ extended: false }),
        (request, response) => {
          let string = request.body.first + " " + request.body.last;
          response.json({ name: string });
          
        });
       



















 module.exports = app;
