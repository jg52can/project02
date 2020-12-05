var express = require("express");
const app =express();
var fs = require('fs');
var bodyparser =require("body-parser");
var configPath = './data.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
var data = '';
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"tttgame"
});

  saveRecord();


  function saveRecord() {

    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("User exists");
          }
        else{
            var email1 = parsed.email;
           var password1 = parsed.myID;
            var name = parsed.fullname;

             var sql = "INSERT INTO login_info (name, email, password) VALUES (?, ?, ?)";

             connection.query(sql, [name, email1, password1]);

             console.log('data inserted');
            }

    });
     
}
    



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));



app.post('/register/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var email=data.email;
    var password= data.password;

    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("User exists");
        }
        else{
            var inser_cmd ="INSERT INTO login_info (name,email,password) values (?,?,?)";
            var values=[name,email,password];
            console.log(result);
            console.log("executing:" + inser_cmd + "" + values);
    
            connection.query(inser_cmd,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("registered !");
                console.log("successful.");
            });
        }


    });

});

app.post('/login/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var email=data.email;
    var password= data.password; 

    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            console.log(result);
     
            if(password==result[0].password){
             res.json("user logged in");
             res.end;
     
            }
            else{
                res.json("wrong password");
                res.end;
            }
        }
         else{
             res.json("User not found");
             res.end;
        }


    });

});

app.listen('3000', ()=> {
    console.log('Server started on port 3000');
});