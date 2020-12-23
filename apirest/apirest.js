const express= require ("express");
const mysql=require ("mysql");
const app=express();
const cors = require('cors')
const compression = require('compression')

const corsOptions = {
    "Access-Control-Allow-Methods" : ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(cors(corsOptions));
app.use(compression());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'mi_reserva'
})

connection.connect()



app.post("/login", (req,res)=>{
    let params = [req.body.email,req.body.password];
    connection.query(sql,params,(err,data)=>{
        if(data==""){
          res.send("no está");
        }
        if (data!=="[]"){
        res.send(data);
        } 
    })
})

app.get("/user_owner/:id",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }
        let id = request.params.id
        let arr = [id]
        if (id != null){
            let sql = "SELECT * FROM user_owner WHERE owner_id = ?"
            connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
            }else{
                    message.control=true;
                    message.data=res;
            }
            response.status(200).send(message);
            })
        }
    })

app.post("/user_owner",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }
        let respuesta;
        let arr = new Array(request.body.cif, request.body.name, request.body.surname, request.body.photo)
        let sql = "INSERT INTO user_owner (cif,name,surname,photo) VALUES (?,?,?,?)"
        connection.query(sql, arr, function(err, res){
            if (err){
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido crear."}
            }else{
                let arr2 = new Array(res.insertId,request.body.mail, request.body.password)
                let sql2 = "INSERT INTO users (owner_id,mail,password) VALUES (?,?,?)"
                connection.query(sql2, arr2, function(err, res){
                    if (err){
                        respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido crear."}
                    }else{
                        message.control=true;
                        response.status(200).send(message);
                    }})
                }})
})

app.put("/user_owner",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }
        let respuesta;
        let arr = new Array(request.body.cif,
            request.body.name,
            request.body.surname,
            request.body.photo,
            request.body.owner_id)
            let sql = "UPDATE user_owner " + 
            "SET cif = COALESCE(?, cif), " + 
            "name = COALESCE(?, name), " +  
            "surname = COALESCE(?, surname), " + 
            "photo = COALESCE(?, photo) " + 
            "WHERE owner_id = ?";
        connection.query(sql, arr, function(err, res){
            if (err){
                response.status(200).send(message);
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido modificar."}
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Usuario modificado correctamente."}
                message.control=true;
                response.status(200).send(message);
            }})
        let arr2 = new Array(request.body.password, request.body.id)
        let sql2 = "UPDATE users SET password = ? WHERE id = ?"
        connection.query(sql2, arr2, function(err, res){
            if (err){
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido modificar."}
                response.status(200).send(message);
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Usuario modificado correctamente."}
                message.control=true;
                response.status(200).send(message);
            }})
})

app.delete("/user_owner",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let arr = new Array ()
        arr.push (request.body.id)
        let sql = "DELETE FROM user_owner WHERE owner_id = ?"
        connection.query(sql,arr, function(err, res){
            if (err){
            respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido eliminar."}
            response.status(200).send(message);
            }else{
            message.control=true;
            response.status(200).send(message);
            respuesta = {error: false, codigo: 200, mensaje: "Usuario eliminado correctamente."}
        }})
        response.status(200).send(message);
    })




app.get("/user_customer/:id",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let id = request.params.id;
        let arr = new Array(id)
        if (id != null){
            let sql = "SELECT * FROM user_customer WHERE customer_id=?"
            connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
            }else{
                message.control=true;
                message.data=res;
            }
            response.status(200).send(message);
            })
        }
    })

app.post("/user_customer",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.phone, request.body.name, request.body.surname, request.body.photo)
        let sql = "INSERT INTO user_customer (phone,name,surname,photo) VALUES (?,?,?,?)"
        connection.query(sql, arr, function(err, res){
            if (err){
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido crear."}
                response.status(200).send(message);
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "usuario creado correctamente. Su id es: " + res.insertId}
                let arr2 = new Array(res.insertId,request.body.mail, request.body.password)
                let sql2 = "INSERT INTO users (customer_id,mail,password) VALUES (?,?,?)"
                connection.query(sql2, arr2, function(err, res2){
                    if (err){
                        response.status(200).send(message);
                        respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido crear."}
                    }else{
                        response.status(200).send(message);
                        respuesta = {error: false, codigo: 200, mensaje: "usuario creado correctamente. Su id es: " + res2.insertId}
                        message.control=true;
                    }})
                    response.status(200).send(message);
            }})
})

app.put("/user_customer",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.phone,
            request.body.name,
            request.body.surname,
            request.body.photo,
            request.body.customer_id)
            let sql = "UPDATE user_owner " + 
            "SET phone = COALESCE(?, phone), " + 
            "name = COALESCE(?, name), " +  
            "surname = COALESCE(?, surname), " + 
            "photo = COALESCE(?, photo) " + 
            "WHERE customer_id = ?";
        connection.query(sql, arr, function(err, res){
            if (err){
                response.status(200).send(message);
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido modificar."}
            }else{
                message.control=true;
                respuesta = {error: false, codigo: 200, mensaje: "Usuario modificado correctamente."}
                response.status(200).send(message);
            }})
        let arr2 = new Array(request.body.password, request.body.id)
        let sql2 = "UPDATE users SET password = ? WHERE id = ?"
        connection.query(sql2, arr2, function(err, res){
            if (err){
                response.status(200).send(message);
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido modificar."}
            }else{
                message.control=true;
                response.status(200).send(message);
                respuesta = {error: false, codigo: 200, mensaje: "Usuario modificado correctamente."}
            }})
    response.status(200).send(message);
})

app.delete("/user_customer",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let arr = new Array ()
        arr.push (request.body.id)
        let sql = "DELETE FROM user_customer WHERE owner_id = ?"
        connection.query(sql,arr, function(err, res){
            if (err){
                response.status(200).send(message);
                respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido eliminar."}
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Usuario eliminado correctamente."}
                message.control=true;
                response.status(200).send(message);
        }})
    response.status(200).send(message);
})

app.get("/restaurant/:id",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let id = request.params.id;
        let arr = new Array(id)
        if (id != null){
            let sql = "SELECT * FROM restaurants WHERE restaurant_id=?"
            connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
            }else{
                message.control=true;
                message.data=res;
                response.status(200).send(message);
            }
            })
        }
    })

app.post("/restaurant",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.name,
            request.body.province,
            request.body.city,
            request.body.street_name,
            request.body.street_number,
            request.body.postal_code,
            request.body.phone,
            request.body.capacity,
            request.body.food_type,
            request.body.header,
            request.body.logo,
            request.body.menu,
            request.body.url,
            request.body.latitude,
            request.body.longitude,
            request.body.owner_id)
        let sql = "INSERT INTO restaurants (name,province,city,street_name,street_number,postal_code," + 
        "phone,capacity,food_type,header,logo,menu,url,latitude,longitude,owner_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        connection.query(sql, arr, function(err, res){
            if (err){
                respuesta = {error: true, codigo: 200, mensaje: "El restaurant no se ha podido crear."}
                response.status(200).send(message);
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Restaurant creado correctamente. Su id es: " + res.insertId}
                        let arr2 = new Array(res.insertId,request.body.mail, request.body.password)
                        let sql2= "INSERT INTO users (restaurant_id,mail,password) VALUES (?,?,?)"        
                        connection.query(sql2, arr2, function(err3, res3){
                                if (err3){
                                        respuesta = {error: true, codigo: 200, mensaje: "El usuario no se ha podido crear."}
                                        response.status(200).send(message);
                                    }else{
                                        message.control=true;   
                                        response.status(200).send(message);
                                        respuesta = {error: false, codigo: 200, mensaje: "usuario creado correctamente. Su id es: " + res3.insertId}
                                    }})
            }})
    })

app.put("/restaurant",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.name,
            request.body.province,
            request.body.city,
            request.body.street_name,
            request.body.street_number,
            request.body.postal_code,
            request.body.phone,
            request.body.capacity,
            request.body.food_type,
            request.body.header,
            request.body.logo,
            request.body.menu,
            request.body.url,
            request.body.latitude,
            request.body.longitude,
            request.body.restaurant_id)
            let sql = "UPDATE restaurants " + 
            "SET name = COALESCE(?, name), " + 
            "province = COALESCE(?, province), " +  
            "city = COALESCE(?, city), " + 
            "street_name = COALESCE(?, street_name), " + 
            "street_number = COALESCE(?, street_number), " +  
            "postal_code = COALESCE(?, postal_code), " + 
            "phone = COALESCE(?, phone), " +  
            "capacity = COALESCE(?, capacity), " + 
            "food_type = COALESCE(?, food_type), " + 
            "header = COALESCE(?, header), " +  
            "logo = COALESCE(?, logo), " + 
            "menu = COALESCE(?, menu), " +  
            "url = COALESCE(?, url), " + 
            "latitude = COALESCE(?, latitude), " + 
            "longitude = COALESCE(?, longitude) " +
            "WHERE restaurant_id = ?";
        connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
                respuesta = {error: true, codigo: 200, mensaje: "El restaurant no se ha podido modificar."}
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Restaurant modificado correctamente."}
                message.control=true;
                response.status(200).send(message);
            }})
            let arr2 = new Array(request.body.password, request.body.id)
            let sql2 = "UPDATE users SET password = ? WHERE id = ?"
            connection.query(sql2, arr2, function(err, res){
                if (err){
                    respuesta = {error: true, codigo: 200, mensaje: "El restaurant no se ha podido modificar."}
                    response.status(200).send(message);
                }else{
                    respuesta = {error: false, codigo: 200, mensaje: "Restaurant modificado correctamente."}
                    message.control=true;
                    response.status(200).send(message);
                }})
})


app.delete("/restaurant",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let arr = new Array ()
        arr.push (request.body.id)
        let sql = "DELETE FROM restaurants WHERE restaurant_id = ?"
        connection.query(sql,arr, function(err, res){
            if (err){
            respuesta = {error: true, codigo: 200, mensaje: "El restaurant no se ha podido eliminar."}
            response.status(200).send(message);
            }else{
            message.control=true;
            response.status(200).send(message);
            respuesta = {error: false, codigo: 200, mensaje: "Restaurant eliminado correctamente."}
        }})
})

app.get("/reservations",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        if(request.query.customer != null){
            let id = request.query.customer;
            let arr = new Array(id)    
            let sql = "SELECT * FROM reservations WHERE customer_id = ?"
            connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
            }else{
                message.control=true;
                message.data=res;
                response.status(200).send(message);
            }})
        }else if (request.query.customer == null){
            let id = request.query.restaurant;
            let arr = new Array(id)    
            let sql = "SELECT * FROM reservations WHERE restaurant_id = ?"
            connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                response.status(200).send(message);
            }else{
                message.control=true;
                message.data=res;
                response.status(200).send(message);
            }})
        }
})

app.post("/reservations",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.customer_id,
            request.body.restaurant_id,
            request.body.table_id,
            request.body.pax,
            request.body.day_name,
            request.body.day,
            request.body.month,
            request.body.year,
            request.body.hour,
            request.body.shift_id,
            request.body.comments,
            request.body.status)
        let sql = "INSERT INTO reservations (customer_id,restaurant_id,table_id,pax,day_name,day,month,year," + 
        "hour,shift_id,comments,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
        connection.query(sql, arr, function(err, res){
            if (err){
                respuesta = {error: true, codigo: 200, mensaje: "La reserva no se ha podido crear."}
                response.status(200).send(message);
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Reserva creada correctamente. Su id es: " + res.insertId}
                message.control=true;
                response.status(200).send(message);
                }})
})

app.put("/reservations",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let respuesta;
        let arr = new Array(request.body.customer_id,
            request.body.restaurant_id,
            request.body.table_id,
            request.body.pax,
            request.body.day_name,
            request.body.day,
            request.body.month,
            request.body.year,
            request.body.hour,
            request.body.shift_id,
            request.body.comments,
            request.body.status,
            request.body.reservation_id)
            let sql = "UPDATE reservations " + 
            "SET customer_id = COALESCE(?, customer_id), " + 
            "restaurant_id = COALESCE(?, restaurant_id), " +  
            "table_id = COALESCE(?, table_id), " + 
            "pax = COALESCE(?, pax), " + 
            "day_name = COALESCE(?, day_name), " +  
            "day = COALESCE(?, day), " + 
            "month = COALESCE(?, month), " +  
            "year = COALESCE(?, year), " + 
            "hour = COALESCE(?, hour), " + 
            "shift_id = COALESCE(?, shift_id), " +  
            "comments = COALESCE(?, comments), " + 
            "status = COALESCE(?, status) " +  
            "WHERE reservation_id = ?";
        connection.query(sql, arr, function(err, res){
            if (err){
                console.log(err);
                respuesta = {error: true, codigo: 200, mensaje: "La reserva no se ha podido modificar."}
                response.status(200).send(message);
            }else{
                respuesta = {error: false, codigo: 200, mensaje: "Reserva modificada correctamente."}
                message.control=true;
                response.status(200).send(message);
            }})
})

app.delete("/reservations",
    function (request, response){
        let message= {
            "control":false,
            "data":null
        }        
        let arr = new Array ()
        arr.push (request.body.id)
        let sql = "DELETE FROM reservations WHERE reservation_id = ?"
        connection.query(sql,arr, function(err, res){
            if (err){
            respuesta = {error: true, codigo: 200, mensaje: "La reserva no se ha podido eliminar."}
            response.status(200).send(message);
            }else{
            respuesta = {error: false, codigo: 200, mensaje: "Reserva eliminada correctamente."}
            message.control=true;
            response.status(200).send(message);
        }})
})

app.listen(3000,function(){
    console.log("listening to port 3000");
})
