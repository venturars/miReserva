const express = require ("express");
const mysql = require ("mysql");
const app = express();
const cors = require('cors');
const compression = require('compression');
const PORT= process.env.PORT || 3000;
const corsOptions = {
    "Access-Control-Allow-Methods" : ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors(corsOptions));
app.use(compression());
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b50579c4e4296a',
    password: '5f84781e',
    database: 'heroku_5589b552b7dd6cb'
})



// function handleDisconnect() {
 

//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }

// handleDisconnect();

//ANTIGUO CONNECT BASE DE DATOS
connection.connect((err,res) => {
    if (err)
    console.log(err);
    else
    console.log("Conectado");

    // Limpieza de BBDD//
    let sql = 
        `DELETE FROM
            users
        WHERE
            owner_id IS null
        AND
            customer_id IS null
        AND
            restaurant_id IS null`;
    connection.query(sql);
});
//-----Login-----
app.post("/login", (req, res) => {
    let params = [
        req.body.mail,
        req.body.password
    ];
    let message = {
        "control": null,
        "data": null,
    }
    let sql =
        `SELECT
            *
        FROM
            users
        WHERE
            users.mail = ?
        AND
            users.password = ?`
    connection.query(sql, params, (err, data) => {
        if(err) {
            res.status(200).send(message);
        }else {
            if(data != "") {
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
                                "longitude": data2[0].longitude
                        }];}
                        res.status(200).send(message);
                });} else if (data[0].owner_id) {
                    params = data[0].owner_id; 
                    sql =
                    `SELECT
                        *
                    FROM
                        user_owner
                    WHERE
                        user_owner.owner_id = ?`
                    connection.query(sql, params, (err, data2) => {
                        if(err){
                        }else {
                            message.control = true;
                            message.data = [{
                                "owner_id": data[0].owner_id,
                                "cif": data2[0].cif,
                                "name": data2[0].name,
                                "surname": data2[0].surname,
                                "photo": data2[0].photo
                        }];}
                        res.status(200).send(message);
                });}else if(data[0].customer_id) {
                    params = data[0].customer_id;
                    sql =
                        `SELECT
                            *
                        FROM
                            user_customer
                        WHERE
                            user_customer.customer_id = ?`;
                    connection.query(sql, params, (err, data2) => {
                        if(err) {
                        }else {
                            message.control = true;
                            message.data = [{
                                "customer_id": data[0].customer_id,
                                "phone": data2[0].phone,
                                "name": data2[0].name,
                                "surname": data2[0].surname,
                                "photo": data2[0].photo
                        }];}
                        res.status(200).send(message);
            });}}else {
                message.control = false;
                message.data = data;
                res.status(200).send(message);
}}});});
//-----Tables-----
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
            message.control = false;
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
        "data": null
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
            message.data = {
                "table_id": data.insertId
        }}
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
            message.control = false;
        } else {
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
app.get("/times/", (req, res) => {
    let params;
    let sql;
    let message = {
        "control": null,
        "data": null
    }
    if(req.query.name && req.query.service && req.query.restaurant_id) {
        params = [
            req.query.name,
            req.query.restaurant_id,
            req.query.service
        ];
        sql =
            `SELECT
                *
            FROM
                times
            WHERE
                times.name = ?
            AND 
                times.restaurant_id = ?
            AND 
                times.service = ?`;
    }else if(req.query.name && req.query.restaurant_id){
        message = {
            "control": null,
            "data": null
        }
        sql =
            `SELECT
                *
            FROM
                times
            WHERE
                times.name = ?
            AND 
                times.restaurant_id = ?
           `;
    }else if(req.query.restaurant_id) {
        params = req.query.restaurant_id;
        sql =
            `SELECT
                *
            FROM
                times
            WHERE
                times.restaurant_id = ?`;
    }else if (req.query.times_id) {
        params = req.query.times_id;
        sql =
        `SELECT
            *
        FROM
            times
        WHERE
            times.times_id = ?`;
    }
    connection.query(sql, params, (err, data) => {
        if(err) {
        }else {
            if (data == "") {
                message.control = false;
                message.data = data;
            }
            else {
                message.control = true;
                message.data = data;          
        }}
         res.status(200).send(message);
});});
app.post("/times", (req, res) => {
    let params = [
        req.body.name,
        req.body.time_from,
        req.body.time_to,
        req.body.restaurant_id,
        req.body.service,
        req.body.active
    ];
    let message = {
        "control": null,
        "data": null
    }
    let sql = 
    `INSERT INTO times 
    (name,
    time_from,
    time_to,
    restaurant_id,
    service,
    active)
    VALUES 
    (?,?,?,?,?,?)`
    connection.query(sql, params, (err, data) => {
         if(err) {
         }else {
            if (data == "") {
                message.control = false;
                message.data = {};
            }else {
                message.control = true;
                message.data = {
                    times_id: data.insertId
                };
        }}
         res.status(200).send(message);
});});
app.put("/times", (req, res) => {
    let params = [
        req.body.name,
        req.body.time_from,
        req.body.time_to,
        req.body.restaurant_id,
        req.body.service,
        req.body.active,
        req.body.times_id,
        
    ];
    let message = {
        "control": null
    }
    let sql =
    `UPDATE times
     SET 
     name = COALESCE(?, name),
     time_from = COALESCE(?, time_from),
     time_to = COALESCE(?, time_to),
     restaurant_id = COALESCE(?, time_to),
     service = COALESCE(?, service),
     active = COALESCE(?, active)

     WHERE 
     times_id= ?
    `
    connection.query(sql, params, (err, data) => {
        if(err) {
        }else {
            if (data == "") {
                message.control = false;
            }
            else {
                message.control = true;
        }}
        res.status(200).send(message);
});});
app.delete("/times", (req, res) => {
    let params = [
        req.body.times_id
    ];
    let message = {
        "control": null,
    }
    let sql =
    `DELETE FROM 
     times
     WHERE 
     times_id= ?
    `
    connection.query(sql, params, (err, data) => {
        if(err) {
            message.control = false;
        }else {
            if(data.affectedRows === 1) {
                message.control = true;
            } else {
                message.control = false;
        }}
        res.status(200).send(message);
});});
////////////// SHIFTS ////////////////////
app.get("/shifts/", (req, res) => {
    let params;
    let sql;
    let message = {
        "control": null,
        "data": null
    }
    if(req.query.restaurant_id) {
        params = req.query.restaurant_id;
        sql =
            `SELECT
                *
            FROM
                shifts
            WHERE
                shifts.restaurant_id = ?`;
    }else if(req.query.shift_id) {
        params = req.query.shift_id;
        sql =
        `SELECT
            *
        FROM
            shifts
        WHERE
            shifts.shift_id = ?`;
    } else if(req.query.times_id) {
        params = req.query.times_id;
        sql =
            `SELECT
                *
            FROM
                shifts
            WHERE
                shifts.times_id = ?`;
    }
    connection.query(sql, params, (err, data) => {
         if(err) {
         }else {
            if (data=="") {
                message.control = false;
                message.data = data;
            }else {
                message.control = true;
                message.data = data;
        }}
        res.status(200).send(message);

});});
app.post("/shifts", (req, res) => {
    let params = [
        req.body.day,
        req.body.shift_from,
        req.body.shift_to,
        req.body.restaurant_id,
        req.body.times_id,
        req.body.pax
    ];
    let message = {
        "control": null,
        "data": null
    }
    let sql =
        `INSERT INTO
            shifts (
                day,
                shift_from,
                shift_to,
                restaurant_id,
                times_id,
                pax
            )
        VALUES (
            ?,?,?,?,?,?
        )`
    connection.query(sql,params,(err,data)=>{
        if(err) {
            message.control = false;
        }else {
            message.control = true;
            message.data = {
                "shifts": data.insertId
        }}
        res.status(200).send(message);
});});
app.put("/shifts", (req, res) => {
    let params = [
        req.body.day,
        req.body.shift_from,
        req.body.shift_to,
        req.body.restaurant_id,
        req.body.times_id,
        req.body.pax,
        req.body.shift_id
    ];
    let message = {
        "control": null
    }
    let sql =
        `UPDATE
            shifts
        SET
            day = COALESCE(?, day),
            shift_from = COALESCE(?, shift_from),
            shift_to = COALESCE(?, shift_to),
            restaurant_id = COALESCE(?, restaurant_id),
            times_id = COALESCE(?, times_id),
            pax = COALESCE(?, pax)
        WHERE 
            shift_id= ?`
    connection.query(sql, params, (err, data) => {
        if(err) {
            message.control = false;
        }else {
            message.control = true;
        }
        res.status(200).send(message);
});});
app.delete("/shifts", (req, res) => {
    let params = [
        req.body.shift_id
    ];
    let message= {
        "control": null,
        "data": null
    }
    let sql=
        `DELETE FROM 
            shifts
        WHERE 
            shift_id= ?`
    connection.query(sql,params,(err,data)=>{
        if (err) {
            message.control = false;
        } else {
            if(data.affectedRows === 1) {
                message.control = true;
            } else {
                message.control = false;
        }}
        res.status(200).send(message);
});});
//-----User_owner-----
app.get("/user_owner/:owner_id", (request, response) => {
    let message= {
        "control": null,
        "data": null
    }
    let sql =
        `SELECT
            *
        FROM
            user_owner
        WHERE
            owner_id = ?`
    connection.query(sql, request.params.owner_id, (err, res) => {
        if (err) {
        }else {
            if(res!="") {
                message.control = true;
                message.data = res;
            }else {
                message.control = false;
                message.data = res;
        }}
        response.status(200).send(message);
});});
app.post("/user_owner", (request, response) => {
    let message = {
        "control": null,
        "data": null
    }
    if (!request.body.mail || !request.body.password) {
        message.control = false;
        response.status(200).send(message);
    }else {
        let arr = new Array(
            request.body.cif,
            request.body.name,
            request.body.surname,
            request.body.photo
        )
        let sql = 
            `INSERT INTO
                user_owner (
                    cif,name,
                    surname,
                    photo
                )
            VALUES (
                ?,?,?,?
            )`
        connection.query(sql, arr, (err, res) => {
            if (err) {
                message = {
                    control: false,
                    data: null,
                    message: "Los datos de usuario no se han podido crear"
                };
                response.status(200).send(message);
            }else {
                arr = [
                    res.insertId,
                    request.body.mail,
                    request.body.password
                ];
                sql = 
                    `INSERT INTO
                        users (
                            owner_id,
                            mail,password
                        )
                    VALUES (
                        ?,?,?
                    )`;
                connection.query(sql, arr, (err2, res2) => {
                    if (err2) {
                        message = {
                            control:false,
                            message: "El usuario del login no se ha podido crear."
                        };
                        sql = 
                        `DELETE FROM
                            user_owner
                            WHERE
                            owner_id = ?`
                        connection.query(sql, res.insertId, (err3, res3) => {
                            if (err3) {
                                message.message = "El logueo no se ha podido crear pero los datos se han creado sin logueo asociado";
                            } else {
                                message.message = "No Se ha podido completar el proceso por incapacidad para crear el usuario de logueo";
                            }
                            response.status(200).send(message);
                    });}else{
                        message.control = true;
                        message.data = {
                            "owner_id": res.insertId
                        }
                        response.status(200).send(message);
}});}});}});
app.put("/user_owner", (request, response) => {
    let message= {
        "control": null,
        "message": null,
        "message2": null
    }
    let arr = new Array(
        request.body.cif,
        request.body.name,
        request.body.surname,
        request.body.photo,
        request.body.owner_id
    );
    let sql =
        `UPDATE
            user_owner
        SET
            cif = COALESCE(?, cif),
            name = COALESCE(?, name),
            surname = COALESCE(?, surname),
            photo = COALESCE(?, photo)
        WHERE
            owner_id = ?`;
    connection.query(sql, arr, (err, res) => {
        if(err) {
            message = {
                control: false,
                message: "No se ha podido actualizar la tabla user_owner",
                message2: null
        }}else {
            message = {
                control: true,
                message: "User_owner actualizado correctamente",
                message2: null
        }}
        arr = [
            request.body.password,
            request.body.owner_id
        ];
        sql =
            `UPDATE
                users
            SET
                password = ?
            WHERE
                owner_id = ?`
        connection.query(sql, arr, (err2, res2) => {
            if (err2) {
                message.control = false;
                message.message2 = "No se ha podido actualizarla tabla users";
            }else{
                message.control = true;
                message.message2 = "Users actualizado correctamente";
            }
            response.status(200).send(message);
});});});
app.delete("/user_owner", (request, response) => {
        let message = {
            "control": null
        }
        let sql =
            `DELETE FROM
                user_owner
            WHERE
                owner_id = ?`;
        connection.query(sql, request.body.owner_id, (err, data) => {
            if (err) {
                message.control = false;
            } else {
                if(data.affectedRows === 1) {
                    message.control = true;
                } else {
                    message.control = false;
            }}
            response.status(200).send(message);
});});
//-----User_customer-----
app.get("/user_customer/:customer_id", (request, response) => {
    let message = {
        "control": null,
        "data": null
    }        
    let sql =
        `SELECT
            *
        FROM
            user_customer
        WHERE
            customer_id = ?`
    connection.query(sql, request.params.customer_id, (err, res) => {
        if (err) {
        }else {
            if(res!="") {
                message.control = true;
                message.data = res;
            }else {
                message.control = false;
                message.data = res;
        }}
        response.status(200).send(message);
});});
app.post("/user_customer", (request, response) => {
    let message= {
        "control": null,
        "message": null,
        "message2": null,
        "data": null
    }
    if (!request.body.mail || !request.body.password) {
        message.control = false;
        response.status(200).send(message);
    }else {
        let arr = new Array(
            request.body.phone,
            request.body.name,
            request.body.surname,
            request.body.photo
        );
        let sql =
            `INSERT INTO
                user_customer (
                    phone,
                    name,
                    surname,
                    photo
                )
            VALUES (
                ?,?,?,?
            )`;
        connection.query(sql, arr, (err, res) => {
            if (err) {
                message.control = false;
                message.message = "No se ha podido crear los datos del usuario";
                response.status(200).send(message);
            }else {
                message.control = true;
                message.message = "Datos de usuario creados correctamente";
                message.data = res.insertId;
                arr = [
                    res.insertId,
                    request.body.mail,
                    request.body.password
                ];
                sql =
                `INSERT INTO
                    users (
                        customer_id,
                        mail,
                        password
                    )
                VALUES (
                    ?,?,?
                )`;
                connection.query(sql, arr, (err2, res2) => {
                    if (err2) {
                        message.control = false;
                        message.message2 = "No se ha podido crear el logeo";
                        sql =
                            `DELETE FROM
                                user_customer
                            WHERE
                                customer_id = ?`;
                        connection.query(sql, res.insertId, (err3, res3) => {
                            if(err3) {
                                message.message = "Se han creado los datos de usuario sin logueo asociado";
                                message.data = {
                                    customer_id: res.insertId
                            }}else {
                                message.message = "No Se ha podido completar el proceso por incapacidad para crear el usuario de logueo";
                            }
                            response.status(200).send(message);
                    });}else {
                        message.control = true;
                        message.data = {
                            "customer_id": res.insertId
                        }
                        message.message = "Usuario creado correctamente";
                        message.message2 = null;
                        response.status(200).send(message);
}});}});}});
app.put("/user_customer", (request, response) => {
    let message = {
        "control": null,
        "message": null,
        "message2": null
    }
    let arr = new Array(
        request.body.phone,
        request.body.name,
        request.body.surname,
        request.body.photo,
        request.body.customer_id
    )
    let sql =
        `UPDATE
            user_customer
        SET
            phone = COALESCE(?, phone),
            name = COALESCE(?, name),
            surname = COALESCE(?, surname),
            photo = COALESCE(?, photo)
        WHERE
            customer_id = ?`;
    connection.query(sql, arr, (err, res) => {
        if (err){
            message = {
                control: false,
                message: "No se ha podido actualizar la tabla user_customer",
                message2: null
        }}else {
            message = {
                control: true,
                message: "Se ha actualizado la tabla user_customer",
                message2: null
        }}
        arr = [
            request.body.password,
            request.body.customer_id
        ];
        sql =
            `UPDATE
                users
            SET
                password = ?
            WHERE
                customer_id = ?`;
        connection.query(sql, arr, (err2, res2) => {
            if (err2) {
                message = {
                    control: false,
                    message: null,
                    message2: "No se ha podido actualizar la tabla users"
            }}else {
                message = {
                    control: true,
                    message: null,
                    message2: "Se ha actualizado la tabla users"
            }}
            response.status(200).send(message);
});});});
app.delete("/user_customer", (request, response) => {
    let message = {
        "control": null
    }
    let sql =
        `DELETE FROM
            user_customer
        WHERE
            owner_id = ?`;
    connection.query(sql, request.body.customer_id, (err, data) => {
        if (err) {
            message.control = false;
        } else {
            if(data.affectedRows === 1) {
                message.control = true;
            } else {
                message.control = false;
        }}
        response.status(200).send(message);
});});
//-----Restaurants-----
app.get("/restaurant", (request, response) => {
    let message = {
        "control": null,
        "data": null
    };
    let params;
    let sql;
    if(request.query.owner_id) {
        params = request.query.owner_id;
        sql =
            `SELECT
                *
            FROM
                restaurants
            WHERE
            owner_id = ?`;
    }else if(request.query.restaurant_id) {
        params = request.query.restaurant_id;
        sql =
            `SELECT
                *
            FROM
                restaurants
            WHERE
                restaurant_id = ?`;
    }else {
        sql =
        `SELECT
            *
        FROM
            restaurants`;
    }
    connection.query(sql, params, (err, res) => {
        if (err) {
        }else {
            if(res!="") {
                message.control = true;
                message.data = res;
            }else {
                message.control = false;
                message.data = res;
        }}
        response.status(200).send(message);
});});
app.post("/restaurant", (request, response) => {
    let message= {
        "control": null,
        "data": null
    };
    if (!request.body.owner_id || !request.body.mail || !request.body.password) {
        message.control = false;
        response.status(200).send(message);
    }else {
        let arr = new Array(
            request.body.name,
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
            request.body.owner_id
        );
        let sql =
        `INSERT INTO
            restaurants (
                name,
                province,
                city,
                street_name,
                street_number,
                postal_code,
                phone,
                capacity,
                food_type,
                header,
                logo,
                menu,
                url,
                latitude,
                longitude,
                owner_id
            )
        VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )`;
        connection.query(sql, arr, (err, res) => {
            if (err) {
                message = {
                    control: false,
                    data: null,
                    mensaje: "El restaurant no se ha podido crear."
                };
                response.status(200).send(message);
            }else {
                arr = [
                    res.insertId,
                    request.body.mail,
                    request.body.password
                ];
                sql = 
                    `INSERT INTO 
                        users (
                            restaurant_id,
                            mail,
                            password
                        )
                    VALUES (
                        ?,?,?
                    )`;
                connection.query(sql, arr, (err2, res2) => {
                    if (err2) {
                        message = {
                            control: false,
                            mensaje: "El usuario no se ha podido crear."
                        };
                        sql = 
                        `DELETE FROM
                            restaurants
                            WHERE
                            restaurant_id = ?`
                        connection.query(sql, res.insertId, (err3, res3) => {
                            if (err3) {
                                message.mensaje = "El usuario no se ha podido crear pero el resturante se ha creado sin administrador asociado";
                            } else {
                                message.mensaje = "No Se ha podido completar el proceso por incapacidad para crear el usuario manager";
                            }
                            response.status(200).send(message);
                    });}else{
                        message = {
                            control: true,
                            mensaje: "El usuario y restaurante se han creado correctamente",
                            data: {
                                restaurant_id: res.insertId
                        }}
                        response.status(200).send(message);
}});}});}});
app.put("/restaurant", (request, response) => {
    let message = {
        "control": null,
        "message": null,
        "message2": null
    }        
    let arr = new Array(
        request.body.name,
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
        request.body.restaurant_id
    );
    let sql =
        `UPDATE
            restaurants
        SET
            name = COALESCE(?, name),
            province = COALESCE(?, province),
            city = COALESCE(?, city),
            street_name = COALESCE(?, street_name),
            street_number = COALESCE(?, street_number),
            postal_code = COALESCE(?, postal_code),
            phone = COALESCE(?, phone),
            capacity = COALESCE(?, capacity),
            food_type = COALESCE(?, food_type),
            header = COALESCE(?, header),
            logo = COALESCE(?, logo),
            menu = COALESCE(?, menu),
            url = COALESCE(?, url),
            latitude = COALESCE(?, latitude),
            longitude = COALESCE(?, longitude)
        WHERE
            restaurant_id = ?`;
    connection.query(sql, arr, (err, res) => {
        if (err){
            message = {
                control: false,
                message: "No se ha podido actualizar la tabla restaurants",
                message2: null
        }}else {
            message = {
                control: true,
                message: "Se ha actualizado la tabla restaurants",
                message2: null
        }}
        arr = [
            request.body.password,
            request.body.restaurant_id
        ];
        sql =
            `UPDATE
                users
            SET
                password = COALESCE(?, street_number)
            WHERE
                restaurant_id = ?`;
        connection.query(sql, arr, (err2, res2) => {
            if (err2) {
                message = {
                    control: false,
                    // message: null,
                    message2: "No se ha podido actualizar la tabla users"
            }}else {
                message = {
                    control: true,
                    // message: null,
                    message2: "Se ha actualizado la tabla users"
            }}
            response.status(200).send(message);
});});});
app.delete("/restaurant", (request, response) => {
        let message = {
            "control": false
        }
        let sql =
            `DELETE FROM
                restaurants
            WHERE
                restaurant_id = ?`
        connection.query(sql, request.body.restaurant_id, (err, data) => {
            if (err) {
                message.control = false;
            } else {
                if(data.affectedRows === 1) {
                    message.control = true;
                } else {
                    message.control = false;
            }}
            response.status(200).send(message);
});});
//-----Reservations-----
app.get("/reservations", (request, response) => {
    let message = {
        "control": null,
        "data": null
    }
    if(request.query.customer) {
        let sql =
            `SELECT
                *
            FROM
                reservations
            WHERE
                customer_id = ?`;
        connection.query(sql, request.query.customer, (err, res) => {
        if (err) {
        }else {
            if(res != "") {
                message.control = true;
                message.data = res;
            }else {
                message.control = false;
                message.data = res;
        }}
        response.status(200).send(message);
    });}else if (request.query.restaurant) {
        let sql =
            `SELECT
                *
            FROM
                reservations
            WHERE
                restaurant_id = ?`
        connection.query(sql, request.query.restaurant, (err, res) => {
        if (err){
        }else{
            if(res != "") {
                message.control = true;
                message.data = res;
            }else {
                message.control = false;
                message.data = res;
        }}
        response.status(200).send(message);
});}else if (request.query.shift_id &&
    request.query.dayName &&
    request.query.dayNum &&
    request.query.month &&
    request.query.year) {
        let params = [request.query.shift_id,
            request.query.dayName,
            request.query.dayNum,
            request.query.month,
            request.query.year]
    let sql =
        `SELECT SUM
            (pax)
        AS 
            pax
        FROM
            reservations
        WHERE
            shift_id = ?
        AND
            day_name = ?
        AND
            day = ?
        AND
            month = ?
        AND
            year = ?`
    connection.query(sql,params, (err, res) => {
    if (err){
    }else{
        if(res != "") {
            message.control = true;
            message.data = res;
        }else {
            message.control = false;
            message.data = res;
    }}
    response.status(200).send(message);
});}

});
app.post("/reservations", (request, response) => {
        let message = {
            "control": null,
            "data": null
        }
        let arr = new Array(
            request.body.customer_id,
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
            request.body.customer_name,
            request.body.customer_phone

        )
        let sql =
            `INSERT INTO
                reservations (
                    customer_id,
                    restaurant_id,
                    table_id,
                    pax,
                    day_name,
                    day,
                    month,
                    year,
                    hour,
                    shift_id,
                    comments,
                    status,
                    customer_name,
                    customer_phone
                )
            VALUES (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )`;
        connection.query(sql, arr, (err, res) => {
            if(err) {
                message.control = false;
            }else {
                message.control = true;
                message.data = {
                    "reservation_id": res.insertId
            }}
            response.status(200).send(message);
});});
app.put("/reservations", (request, response) => {
    let message = {
        "control": null
    }        
    let arr = new Array(
        request.body.customer_id,
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
        request.body.reservation_id
    )
    let sql =
        `UPDATE
            reservations
        SET
            customer_id = COALESCE(?, customer_id),
            restaurant_id = COALESCE(?, restaurant_id),
            table_id = COALESCE(?, table_id),
            pax = COALESCE(?, pax),
            day_name = COALESCE(?, day_name),
            day = COALESCE(?, day),
            month = COALESCE(?, month),
            year = COALESCE(?, year),
            hour = COALESCE(?, hour),
            shift_id = COALESCE(?, shift_id),
            comments = COALESCE(?, comments),
            status = COALESCE(?, status)
        WHERE
            reservation_id = ?`;
    connection.query(sql, arr, (err, res) => {
        if (err) {
            message.control = false;
        }else {
            message.control = true;
        }
        response.status(200).send(message);
});});
app.delete("/reservations", (request, response) => {
    let message = {
        "control": null
    }        
    let sql =
        `DELETE FROM
            reservations
        WHERE
            reservation_id = ?`;
    connection.query(sql, request.body.reservation_id, (err, data) => {
        if (err) {
            message.control = false;
        } else {
            if(data.affectedRows === 1) {
                message.control = true;
            } else {
                message.control = false;
        }}
        response.status(200).send(message);
});});
//-----Search-----
app.get('/search', (req, res) => {
    let params;
    let message = {
        "control": null,
        "data": null
    }
    let sql;
        // if(req.query.food_type) {
        //     params = req.query.food_type;
        //     sql =
        //         `SELECT
        //             restaurants.restaurant_id,
        //             restaurants.name,
        //             restaurants.province,
        //             restaurants.city,
        //             restaurants.street_name,
        //             restaurants.street_number,
        //             restaurants.postal_code,
        //             restaurants.phone,
        //             restaurants.food_type,
        //             restaurants.logo,
        //             restaurants.header,
        //             restaurants.menu,
        //             restaurants.url,
        //             restaurants.latitude,
        //             restaurants.longitude
        //         FROM
        //             restaurants
        //         WHERE
        //             restaurants.food_type = ?`;
        // }
        // else {
            sql =
                `SELECT
                    restaurants.restaurant_id,
                    restaurants.name,
                    restaurants.province,
                    restaurants.city,
                    restaurants.street_name,
                    restaurants.street_number,
                    restaurants.postal_code,
                    restaurants.phone,
                    restaurants.food_type,
                    restaurants.header,
                    restaurants.logo,
                    restaurants.menu,
                    restaurants.url,
                    restaurants.latitude,
                    restaurants.longitude
                FROM
                    restaurants`;
        // }
        connection.query(sql, params, (err, data) => {
            if(err) {
                message.control = false;
                message.data = err;
            }else {
                message.control = true;
                message.data = data;
            }
            res.status(200).send(message);
        });
});
//-----Registration-----
app.post("/registration", (req, res)=> {
    let params = [
    req.body.mail
    ];
    let message = {
        "control": null,
        "message": null,
        "data": {
            "customer_id": null,
            "owner_id": null
        }
    }
    let sql =
        `SELECT 
            *
        FROM
            users
        WHERE
            users.mail= ?`;
    connection.query(sql,params, (err, data) => {
        if(err) {
            console.log(err);
            res.status(200).send(message);
        }else {
            if(data!="") {
                message.control = false;
                message.message = 'Este correo ya está registrado';
                message.data=[];
                res.status(200).send(message);
            } else {
                if(req.body.cif) {
                    params = [
                        req.body.cif,
                        req.body.name,
                        req.body.surname
                    ];
                    sql =
                        `INSERT INTO
                            user_owner (
                                owner_id,
                                cif,
                                name,
                                surname,
                                photo
                            )
                        VALUES (
                            null, ?, ?, ?, null
                        )`;
                }else {
                    params = [
                        req.body.phone,
                        req.body.name,
                        req.body.surname
                    ];
                     sql=`INSERT INTO user_customer (
                        customer_id,
                        phone,
                        name,
                        surname,
                        photo    
                    )
                    VALUES (
                        null, ?, ?, ?, null
                    )`;
                }
                connection.query(sql,params, (err, data1) => {
                    if(err) {
                        console.log(err);
                        message.control = false;
                        message.data = [];
                        res.status(200).send(message);
                    }
                    else {
                        params = [
                            data1.insertId,
                            req.body.mail,
                            req.body.password
                        ];
                        if(req.body.cif) {
                            sql = 
                                `INSERT INTO
                                users(
                                    id,
                                    restaurant_id,
                                    owner_id,
                                    customer_id,
                                    mail,
                                    password
                                )
                                VALUES(
                                    null, null, ?, null, ?, ?
                                )`;
                        }else {
                            sql = 
                            `INSERT INTO
                            users(
                                id,
                                restaurant_id,
                                owner_id,
                                customer_id,
                                mail,
                                password
                            )
                            VALUES(
                                null, null, null, ?, ?, ?
                            )`;
                        }
                        connection.query(sql,params, (err,data2)=>{
                            if (err) {
                                console.log(err);
                                if (req.body.cif) {
                                    params = [data1.insertId];
                                    sql =
                                        `DELETE FROM 
                                            user_owner
                                        WHERE
                                            owner_id = ?`;
                                }else {
                                    params = [data1.insertId];
                                    sql =
                                        `DELETE FROM 
                                            user_customer
                                        WHERE
                                        customer_id = ?`;
                                }
                                connection.query(sql, params, (err, data3)=>{
                                    if (err) {
                                        message.control = false;
                                        message.message = 'Usuario creado sin usuario de logueo';
                                        message.data.customer_id = data1.insertId;
                                        message.data.owner_id = data1.insertId;
                                    } else {
                                        message.control = false;
                                        message.message = 'Ha fallado el proceso de creación de logueo del usuario';
                                        message.data = [];
                                    }
                                    res.send(message)
                            });}else {
                                    message.control = true;
                                    message.message = 'Usuario creado correctamente';
                                    message.data.customer_id = data1.insertId;
                                    message.data.owner_id = data1.insertId;
                                    res.send(message); 
}});}});}}});});
app.get("/registration", (req, res)=>{
    let params=[req.query.mail]
    let message={"control":null,
                "data":null}
    let sql=`SELECT
             *
            FROM
            users
            WHERE
            mail = ?`
    connection.query(sql,params, (err,data)=>{
        if (err){
            res.send(err)
        }
        else{
            if (data==""){
                message.control=true;
                message.data=[];
            }
            else{
                message.control=false;
                message.data=data;
            }
        }
        res.send(message)
    })
})
app.put("/restaurant2", (request, response) => {
    let message = {
        "control": null,
        "message": null,
        "message2": null
    }        
    let arr = new Array(
        request.body.name,
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
        request.body.restaurant_id
    );
    let sql =
        `UPDATE
            restaurants
        SET
            name = COALESCE(?, name),
            province = COALESCE(?, province),
            city = COALESCE(?, city),
            street_name = COALESCE(?, street_name),
            street_number = COALESCE(?, street_number),
            postal_code = COALESCE(?, postal_code),
            phone = COALESCE(?, phone),
            capacity = COALESCE(?, capacity),
            food_type = COALESCE(?, food_type),
            header = COALESCE(?, header),
            logo = COALESCE(?, logo),
            menu = COALESCE(?, menu),
            url = COALESCE(?, url),
            latitude = COALESCE(?, latitude),
            longitude = COALESCE(?, longitude)
        WHERE
            restaurant_id = ?`;
    connection.query(sql, arr, (err, res) => {
        if (err){
            message = {
                control: false,
                message: "No se ha podido actualizar la tabla restaurants",
                message2: null
        }}else {
            message = {
                control: true,
                message: "Se ha actualizado la tabla restaurants",
                message2: null
        }}
        response.send(message);
})});

app.post("/", (req, res) => {
res.send("hello");
});
app.listen(PORT, () => {
    console.log("listening to port"+ PORT);
});