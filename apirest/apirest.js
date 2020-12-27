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

connection.connect(function(err,res)
{
    if (err)
    console.log(err);
    else
    console.log("Conectado");
});
/**
 *  Login Api
 * 
 */
app.post("/login", (req, res) => {

    let params = [req.body.mail,req.body.password];
    let message = {
        "control": null,
        "data": null,
    }
    let sql = 
        `SELECT
            users.restaurant_id,
            users.owner_id,
            users.customer_id,
            users.mail,
            users.password
        FROM
            users
        WHERE
            users.mail = ?
        AND
            users.password = ?`
    connection.query(sql, params, (err, data) => {
        if(err) {
            console.log(err)
            res.status(200).send(message);
        }else {
            if(data!="") {
               if(data[0].restaurant_id) {
                   params = data[0].restaurant_id; 
                   sql = 
                    `SELECT
                        *
                    FROM
                        restaurants
                    WHERE
                        restaurants.restaurant_id = ?`
                    connection.query(sql, params, (err, data2) => {
                        if(err) {
                            console.log(err)
                        }else {
                            message.control = true;
                            message.data = [{
                                "restaurant_id": data[0].restaurant_id,
                                "name": data2[0].name,
                                "province": data2[0].province,
                                "city": data2[0].city,
                                "street_name": data2[0].street_name,
                                "street_number": data2[0].street_number,
                                "postal_code": data2[0].postal_code,
                                "phone": data2[0].phone,
                                "capacity": data2[0].capacity,
                                "food_type": data2[0].food_type,
                                "header": data2[0].header,
                                "logo": data2[0].logo,
                                "menu": data2[0].menu,
                                "url": data2[0].url,
                                "latitude": data2[0].latitude,
                                "longitude": data2[0].longitude,
                                "owner_id": data2[0].owner_id
                            }]
                        }
                        res.status(200).send(message);
                    });
                } else if (data[0].owner_id) {
                    params = data[0].owner_id; 
                    sql =
                    `SELECT
                        user_owner.cif,
                        user_owner.name,
                        user_owner.surname,
                        user_owner.photo
                    FROM
                        user_owner
                    WHERE
                        user_owner.owner_id`
                    connection.query(sql, params, (err, data2) => {
                        if(err){
                            console.log(err)
                        }else {
                            message.control = true;
                            message.data = [{
                                "owner_id": data[0].owner_id,
                                "cif": data2[0].cif,
                                "name": data2[0].name,
                                "surname": data2[0].surname,
                                "photo": data2[0].photo
                            }]
                        }
                        res.status(200).send(message);
                    });
                }else if(data[0].customer_id) {
                    params = data[0].customer_id;
                    sql =
                        `SELECT
                            user_customer.phone,
                            user_customer.name,
                            user_customer.surname,
                            user_customer.photo
                        FROM
                            user_customer
                        WHERE
                            user_customer.customer_id = ?`
                    connection.query(sql, params, (err, data2) => {
                        if(err) {
                            console.log(err)
                        }else {
                            message.control = true;
                            message.data = [{
                                "customer_id": data[0].customer_id,
                                "phone": data2[0].phone,
                                "name": data2[0].name,
                                "surname": data2[0].surname,
                                "photo": data2[0].photo
                            }]
                        }
                        res.status(200).send(message);
                    });
                }
            }else {
                message.control = false;
                message.data = data;
                res.status(200).send(message);
            }
        }
    });
});
//-----EndPoints table-----
app.get("/tables/:restaurant_id", (req, res) => {
    let params = req.params.restaurant_id;
    let message = {
        "control": null,
        "data": null
    }
    let sql =
        `SELECT
            *
        FROM
            tables
        WHERE
            tables.restaurant_id = ?`;
    connection.query(sql, params, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if(data!="") {
                message.control = true;
                message.data = data;
            } else {
                message.control = false;
                message.data = data;
        }}
        res.status(200).send(message);
});});
app.post("/tables", (req, res) => {
    let params = [
        req.body.table_name,
        req.body.table_max,
        req.body.table_min,
        req.body.restaurant_id,
    ];
    let message = {
        "control": null,
    }
    let sql =
        `INSERT INTO tables (
            tables.table_id,
            tables.table_name,
            tables.table_max,
            tables.table_min,
            tables.restaurant_id
        )
        VALUES (
            null, ?, ?, ?, ?
        )`;
    connection.query(sql, params, (err, data) => {
        if (err) {
            message.control = false;
        } else {
            message.control = true;
        }
        res.status(200).send(message);
});});
app.put("/tables", (req, res) => {
    let params = [
        req.body.table_name,
        req.body.table_max,
        req.body.table_min,
        req.body.restaurant_id,
        req.body.table_id
    ]
    let message = {
        "control": null,
    }
    let sql =
        `UPDATE
            tables
        SET
            tables.table_name = COALESCE(?, tables.table_name),
            tables.table_max =  COALESCE(?, tables.table_max),
            tables.table_min =  COALESCE(?, tables.table_min),
            tables.restaurant_id =  COALESCE(?, tables.restaurant_id)
        WHERE
            tables.table_id = ?`;
    connection.query(sql, params, (err, data) => {
        if (err) {
            console.log(err)
            message.control = false;
        } else {
            console.log(data);
            if(data.affectedRows === 1) {
            message.control = true;
            } else {
                message.control = false;
            }}
        res.status(200).send(message);
});});
app.delete("/tables", (req, res) => {
    let params = req.body.table_id;
    let message = {
        "control": null,
    }
    let sql =
        `DELETE FROM
            tables
        WHERE
            tables.table_id = ?`;
    connection.query(sql, params, (err, data) => {
        if (err) {
            console.log(err)
            message.control = false;
        } else {
            if(data.affectedRows === 1) {
            message.control = true;
            } else {
                message.control = false;
            }}
        res.status(200).send(message);
});});



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

app.get("/times/:restaurant_id", (req, res) => {
    let params = req.params.restaurant_id;
    let message = {
        "control": null,
        "data": null
    }
    let sql =
        `SELECT
            *
        FROM
            times
        WHERE
            times.restaurant_id = ?`;
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

app.get("/shifts/:restaurant_id", (req, res) => {
    let params = req.params.restaurant_id;
    let message = {
        "control": null,
        "data": null
    }
    let sql =
        `SELECT
            *
        FROM
            shifts
        WHERE
            shifts.restaurant_id = ?`;
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