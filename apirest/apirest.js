const express= require ("express");
const mysql=require ("mysql");
const app=express();
const cors = require('cors')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'mi_reserva'
})

connection.connect()

var sql=null;

app.post("/login", (req,res)=>{
    let params = [req.body.email,req.body.password];

    sql="SELECT * FROM user_customer WHERE customer_mail=? AND customer_password=?"
    connection.query(sql,params,(err,data)=>{
         if(data==""){
          res.send("no está");
        }
        if (data!=="[]"){
        res.send(data);
        } 
    })
})



app.listen(3000,function(){
    console.log("listening to port 3000");
})
