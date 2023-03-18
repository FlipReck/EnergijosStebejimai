const cors = require('cors');
const AppError = require('./utils/appError');
const express = require('express')
const app = express()
const mysql = require("mysql");

const pool = mysql.createPool({
    // connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pvpdb'
})

// app.get("/api", (req, res) => {
//     res.json({"users":["userOne", "userTwo", "userThree"]})
// })

// app.listen(5000, () =>{console.log("Server started on port 5000")})

// app.use('/api/arduin', arduinRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
    cors()
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header('Origin'));
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/getAll', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM irasai', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('data: \n', rows)
        })
    })
});

// SELECT sensor_id, hour(reading_time), AVG(power) FROM `sensordata` WHERE sensor_id = 1 GROUP BY hour(reading_time)

app.get('/getHourGraph', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT hour(laikas) as hour, AVG(galia) as power FROM `irasai` WHERE id_sensorius = 1 GROUP BY hour(laikas)', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('data: \n', rows)
        })
    })
});

app.post('/newSensorEntry', function(req, res, next) {

    console.log('The query is: \n', req.query)
    console.log('The body is: \n', req.body)
    console.log('The id is: \n', req.body.sensor_id)
    console.log('The power is: \n', req.power)
    console.log('The params is: \n', req.params)

    pool.getConnection((err, connection) => {
        if (err) throw err


        const sensor_id = req.body.sensor_id
        const power = req.body.power
        const useage = req.body.useage

        connection.query('INSERT INTO irasai SET id_sensorius = ?, galia = ?, sanaudos = ?', [sensor_id, power, useage], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Entry has been added.`)
            } else {
                console.log(err)
            }

        })
    })
});

//SELECT patalpa.kompiuteriu_kiekis, patalpa.energijos_riba_per_zmogu FROM `irasai` INNER JOIN (sensorius INNER JOIN patalpa on sensorius.id_patalpa = patalpa.id) on irasai.id_sensorius = sensorius.id


// app.get('/test', (req, res) => {
//     observationsControler.getAllObservations,
//     res.send('json')
// });
app.listen(5000, () => { console.log("Server started on port 5000") })



// app.use('*', (req, res, next) => {
//   next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
// });
// app.use(globalErrorHandler);

module.exports = app;