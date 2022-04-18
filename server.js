// jshint es:version6

require("dotenv").config();

require("./config/db").connect();

const User = require("./model/users");
const Article = require("./model/articles");
const auth = require("./middleware/auth");

const routes = require('./routes/articles');
const users = require('./routes/users');
const express = require("express");
        
 const swaggerUi = require('swagger-ui-express');
 const swaggerJSDoc = require('swagger-jsDoc');
const articles = require("./model/articles");

 const options = {
          definition : {
            openapi : "3.0.0",
         info: {
                 title : "REST API",
                 version : "1.0.0",
                 description : "A REST API for Article"
            },
            servers : [
              {
                url: "http://localhost:3000"
              }
            ],
           
          },         
          apis : ['./routes/*.js'],
 }
const  specs = swaggerJSDoc(options);

const app = express();
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

app.use('/', routes);
app.use('/',  users);





  
const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT ;

app.listen(port , () =>{

    console.log(`Server running on port ${port}`);
});
