const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});
 
app.post("/",function(req,res){
    const first=req.body.fName;
    const last = req.body.lName;
    const email = req.body.email;
     var data ={
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME:first,
                    LNAME:last
                }
            }
        ]
     }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/40add918cd";
    const options ={
        method:"POST",
        auth:"MUDDASSIRSULTAN:07d17717cbc8906ac8bfe8336ce720d8-us21"
    }
     const request =https.request(url,options,function(response){
        if(response.statusCode=200){
            res.sendFile(__dirname+"/success.html");
        }else{
         res.sendFile(__dirname+"/failure.html");
        }
        
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
     });
     request.write(jsonData);
     request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server is on");
});
//api
//07d17717cbc8906ac8bfe8336ce720d8-us21
//list id 40add918cd.