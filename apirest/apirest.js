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



//////////////TIMES////////////////////

app.post("/times", (req,res)=>{
    let params = [req.body.name,req.body.time_from, req.body.time_to, req.body.restaurant_id, req.body.service];
    let message= {
        "control":null,
        "data":null
    }

    let sql=`
    INSERT INTO times 
    (name,
    time_from,
    time_to,
    restaurant_id,
    service)
    VALUES 
    (?,?,?,?,?)
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 message.data=data;
                  
                }
         }
         res.status(200).send(message);
    })
})

app.get("/times", (req,res)=>{

    let params = [req.body.name,req.body.time_from, req.body.time_to, req.body.restaurant_id, req.body.service];
    let message= {
        "control":null,
        "data":null
    }

    let sql=`
    SELECT 
    *
    FROM 
    times
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 
                  
                }
         }
         res.status(200).send(message);
    })
})

app.get("/times", (req,res)=>{

    let params = [req.body.name,req.body.time_from, req.body.time_to, req.body.restaurant_id, req.body.service];
    let message= {
        "control":null,
        "data":null
    }

    let sql=`
    SELECT 
    *
    FROM 
    times
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 message.data=data;
                  
                }
         }
         res.status(200).send(message);
    })
})

app.put("/times", (req,res)=>{

    let params = [req.body.name,req.body.time_from, req.body.time_to, req.body.restaurant_id, req.body.service,req.body.times_id];
    let message= {
        "control":null,
        "data":null
    }

    let sql=
    `UPDATE times
     SET 
     name = COALESCE(?, name),
     time_from = COALESCE(?, time_from),
     time_to = COALESCE(?, time_to),
     restaurant_id = COALESCE(?, time_to),
     service = COALESCE(?, service)
     WHERE 
     times_id= ?
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
              
                  
                }
         }
         res.status(200).send(message);
    })
})


app.delete("/times", (req,res)=>{

    let params = [req.body.times_id];
    let message= {
        "control":null,
        "data":null
    }

    let sql=
    `DELETE FROM 
     times
     WHERE 
     times_id= ?
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 
                  
                }
         }
         res.status(200).send(message);
    })
})

////////////// SHIFTS ////////////////////



app.post("/shifts", (req,res)=>{
    let params = [req.body.day,req.body.shift_from, req.body.shift_to, req.body.restaurant_id, req.body.times_id, req.body.pax];
    let message= {
        "control":null,
        "data":null
    }

    let sql=`
    INSERT INTO shifts 
    (day,
    shift_from,
    shift_to,
    restaurant_id,
    times_id,
    pax)
    VALUES 
    (?,?,?,?,?,?)
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 
                  
                }
         }
         res.status(200).send(message);
    })
})

app.delete("/shifts", (req,res)=>{

    let params = [req.body.shift_id];
    let message= {
        "control":null,
        "data":null
    }

    let sql=
    `DELETE FROM 
     shifts
     WHERE 
     shift_id= ?
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                  
                }
         }
         res.status(200).send(message);
    })
})

app.put("/shifts", (req,res)=>{

    let params = [req.body.day,req.body.shift_from, req.body.shift_to, req.body.restaurant_id, req.body.times_id,req.body.pax, req.body.shift_id];
    let message= {
        "control":null,
        "data":null
    }

    let sql=
    `UPDATE shifts
     SET 
     day = COALESCE(?, day),
     shift_from = COALESCE(?, shift_from),
     shift_to = COALESCE(?, shift_to),
     restaurant_id = COALESCE(?, restaurant_id),
     times_id = COALESCE(?, times_id),
     pax = COALESCE(?, pax)
     WHERE 
     shift_id= ?
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                  
                }
         }
         res.status(200).send(message);
    })
})

app.get("/shifts", (req,res)=>{
    let params=[];
    let message= {
        "control":null,
        "data":null
    }

    let sql=
    `SELECT * 
    FROM
    shifts
    `

    connection.query(sql,params,(err,data)=>{
         if(err){ console.log(err)}
         else{
             if (data==""){
                 message.control=false;
                 message.data=data;
             }
             else{
                 message.control=true;
                 message.data=data;
                  
                }
         }
         res.status(200).send(message);
    })
    
})

app.listen(3000,function(){
    console.log("listening to port 3000");
})
