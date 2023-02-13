const cors = require('cors');
const AppError = require('./utils/appError');
const express = require('express')
const app = express()
const mysql = require("mysql");

const pool  = mysql.createPool({
    // connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'test2'
})

// app.get("/api", (req, res) => {
//     res.json({"users":["userOne", "userTwo", "userThree"]})
// })

// app.listen(5000, () =>{console.log("Server started on port 5000")})

// app.use('/api/arduin', arduinRouter);
app.use(express.json());
app.use(
    cors()
);


app.get('/getAll', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM reportdata', (err, rows) => {
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

// app.get('/test', (req, res) => {
//     observationsControler.getAllObservations,
//     res.send('json')
// });
app.listen(5000, () =>{console.log("Server started on port 5000")})



// app.use('*', (req, res, next) => {
//   next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
// });
// app.use(globalErrorHandler);

module.exports = app;