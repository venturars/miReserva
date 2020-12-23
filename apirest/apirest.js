const express= require ("express");
const mysql=require ("mysql");
const app=express();
const cors = require('cors');
const { measureMemory } = require("vm");
const { param } = require("jquery");
const { query } = require("express");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
 
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
app.listen(3000,function() {
    console.log("listening to port 3000");
})
