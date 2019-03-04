const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const helper = require("./helper");

class Server{
    constructor(){
        this.port = process.env.PORT || 4000;
        this.host = 'localhost';
        this.app = express();
        this.http = http.createServer(this.app)
    }

    appConfig() {
        this.app.use(
            bodyParser.json
        )
        this.app.use(express.static('client'))
    }

    includeRoutes(app){
        app.get("/getSuggession", function (request, response) {
            let suggestionString = request.body.suggestion;
            helper.getSuggestion(suggestionString, (result) =>{
                if(result.error) {
                    response.status(100).json({"error": true, message: "Error in connection database"})
                }
                else if(result.rows.lenght === 0){
                    response.status(404).json({"error": true, "message": "No result Found"});
                }
                else{
                    response.status(200).json(result)
                }
            })
        })
    }

    appExecute() {
        this.appConfig();
        this.includeRoutes(this.app)

        this.http.listen(this.port, this.host, () =>{
            console.log(`listening on http://${this.host}:${this.port}`)
        })
    }
}

const app = new Server();
app.appExecute();
