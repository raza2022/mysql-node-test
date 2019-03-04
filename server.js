/*
* @author Shashank Tiwari
* did you mean using Nodejs
*/
'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const helper = require('./helper');

class Server {

    constructor() {
        this.port = process.env.PORT || 4000;
        this.host = `localhost`;

        this.app = express();
        this.http = http.Server(this.app);
    }

    appConfig() {
        this.app.use(
            bodyParser.json()
        );
        this.app.use(require("express").static('client'));
    }

    /* Including app Routes starts*/
    includeRoutes(app) {
        app.get("/", function (req, res) {
            res.sendFile(__dirname + '/client/index.html');
        });

        app.post("/getSuggestion", function (request, response) {
            //Storing the user entered string into variable
            let suggestionString = request.body.suggestion;

            helper.getSuggestion(suggestionString,(result)=>{
                console.log(result)
                if (result.error) {
                    response.status(100).json({ "error": true,"message": "Error in connection database" });
                }else if(result.rows.length === 0){
                    response.status(404).json({ "error": true,"message": "No result Found" });
                }else{
                    response.status(200).json(result);
                }
            });
        });
    }
    /* Including app Routes ends*/

    appExecute() {

        this.appConfig();
        this.includeRoutes(this.app);

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();
