var express  = require('express');
var bodyparser = require("body-parser");
var mysql = require("mysql")

var app = express();
app.use(express.json());

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodeapi"
})

app.get("/",(req,res)=>{

 
    res.end("welcome node API")
});

app.put("/save",(req, res)=>{
    let body = req.body;
    
    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({ status:"failed",data:"connection failed"}))
        }
        else{
        var sql = "INSERT INTO users(name, email, mobileno) ";
       sql += " VALUES('"+ body.name + "','"+ body.emil +"','"+ body.mobileno + "')";
        con.query(sql,(err,result)=>{
            con.end()
            if(err){
                res.end(JSON.stringify({status:"failed",data:err}));
            }
            else{
            res.end(JSON.stringify({status:"success",data:result}))
        }
        });
    }
    });
    
});

app.get("/list", (req,res)=>{
    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed", data:"connection failed"}));
        }
        else{
            var sql = "SELECT * FROM users ORDER BY name";
            con.query(sql, (err, result)=>{
                con.end();
                if(err){
                    res.end(JSON.stringify({status:"failed", data:err}))
                }
                else{
                    res.end(JSON.stringify({status:"success",data:result}))
                }
            });
        }
    });
}); 

app.get("/get/:id",(req, res)=>{
    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed", data:"connection failed"}))
        }
        else{
            var sql = "SELECT * FROM users WHERE id = " + req.params.id;
            con.query(sql, (err, result)=>{
                con.end();
                if(err){
                    res.end(JSON.stringify({status:"failed", data:err}))
                }
                else{
                    res.end(JSON.stringify({status:"success",data:result}))
                }
            });
        }
    });
});



app.post("/update",(req, res)=>{
    let body = req.body;
    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed", data:"connection failed"}))
        }
        else{
            var sql = "UPDATE users SET name = '" +  body.name + "', ";
            sql+= "email= '"+ body.email +"', mobileno = '"+ body.mobileno +"' ";
            sql+= "WHERE id = " + body.id;
             req.params.id;
            con.query(sql, (err, result)=>{
                con.end();
                if(err){
                    res.end(JSON.stringify({status:"failed", data:err}))
                }
                else{
                    res.end(JSON.stringify({status:"success",data:result}))
                }
            });
        }
    });
});




app.delete("/delete/:id",(req, res)=>{
    con.connect((err)=>{
        if(err){
            res.end(JSON.stringify({status:"failed", data:"connection failed"}))
        }
        else{
            var sql = "DELETE FROM users WHERE id = " + req.params.id;
            con.query(sql, (err, result)=>{
                con.end();
                if(err){
                    res.end(JSON.stringify({status:"failed", data:err}))
                }
                else{
                    res.end(JSON.stringify({status:"success",data:result}))
                }
            });
        }
    });
});





app.listen(8081, ()=>{
    console.log("server running on http://localhost:8081/");
});