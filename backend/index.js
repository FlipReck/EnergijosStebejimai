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

//
//Irasai backend
//

// Get all irasai
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

//Insert one entry to irasas
app.post('/newSensorEntry', function(req, res) {

    pool.getConnection((err, connection) => {
        if (err) throw err


        const sensor_id = req.body.sensor_id
        const power = req.body.power
        const useage = req.body.useage

        connection.query('INSERT INTO irasai SET id_sensorius = ?, galia = ?, sanaudos = ?', [sensor_id, power, useage], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                console.log(`Entry has been added.`)
                res.redirect('back')
            } else {
                console.log(err)
            }

        })
    })
});

//Get irasai of a single day, that are grouped by hours
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

//
//Patalpos backend
//

//Get all patalpos
app.get('/getAllAccommendation', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM patalpa', (err, rows) => {
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

//Get one entry from patalpa by id
app.get('/getAccommendation/:id', (req, res) => {
    console.log(req.params.id)
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM patalpa WHERE id = ?',[req.params.id], (err, rows) => {
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





//Update one entry from patalpa by id
app.post('/updateAccommendation', (req, res) => {
    console.log(req.params.id)
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }

        const id = req.body.accommondationId;
        const pavadinimas = req.body.pavadinimas;
        const atsakingo_asmens_vardas = req.body.atsakingo_asmens_vardas;
        const atsakingo_asmens_pavarde = req.body.atsakingo_asmens_pavarde;
        const atsakingo_asmens_kontaktas = req.body.atsakingo_asmens_kontaktas;
        const kompiuteriu_kiekis = req.body.kompiuteriu_kiekis;
        const energijos_riba_per_zmogu = req.body.energijos_riba_per_zmogu;

        connection.query('UPDATE `patalpa` SET`pavadinimas`= ? ,`atsakingo_asmens_vardas`= ? ,`atsakingo_asmens_pavarde`= ? ,`atsakingo_asmens_kontaktas`= ? ,`kompiuteriu_kiekis`= ? ,`energijos_riba_per_zmogu`= ? WHERE id = ?',
        [pavadinimas, atsakingo_asmens_vardas, atsakingo_asmens_pavarde, atsakingo_asmens_kontaktas, kompiuteriu_kiekis, energijos_riba_per_zmogu, id], (err, rows) => {
            connection.release() // return the connection to pool
            if (err){
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).json({pavadinimas: pavadinimas})

            console.log('data: \n', rows)
        })
    })
});

//Get all prietaisai that belong to patalpa with id
app.get('/getAllDevices/:id', (req, res) => {
    console.log(req.params.id)
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM prietaisai WHERE id_patalpa = ?',[req.params.id], (err, rows) => {
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


//Get schedule that belong to patalpa with id
app.get('/getSchedule/:id', (req, res) => {
    console.log(req.params.id)
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT diena.savaites_diena, uzimtumo_laikas.pradzia, uzimtumo_laikas.pabaiga, uzimtumo_laikas.asmenu_kiekis FROM savaite INNER JOIN savaites_diena ON savaite.id = savaites_diena.id_savaite INNER JOIN diena ON savaites_diena.id_diena = diena.id INNER JOIN dienos_laikas ON diena.id = dienos_laikas.id_diena INNER JOIN uzimtumo_laikas ON dienos_laikas.id_uzimtumo_laikas = uzimtumo_laikas.id WHERE savaite.id_patalpa = ?',[req.params.id], (err, rows) => {
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

//
//Diena backend
//

//Get all diena
app.get('/getAllDays', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM diena', (err, rows) => {
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

//Get all dienu laikus
app.get('/getAllDaySchedule', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM dienos_laikas INNER JOIN diena on diena.id = dienos_laikas.id_diena INNER JOIN uzimtumo_laikas ON dienos_laikas.id_uzimtumo_laikas = uzimtumo_laikas.id', (err, rows) => {
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

//Get one entry from diena by id
app.get('/getDay/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM diena WHERE id = ?',[req.params.id], (err, rows) => {
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

//Insert one entry to diena
app.post('/newDay', function(req, res) {

    pool.getConnection((err, connection) => {
        if (err) throw err


        const savaites_diena = req.body.savaites_diena

        console.log(savaites_diena)

        connection.query('INSERT INTO diena SET savaites_diena = ?', savaites_diena, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                console.log(`Day has been added.`)
                res.redirect('back')
            } else {
                console.log(err)
            }

        })

    })
});

//Update one entry from diena by id
app.post('/updateDay/:id', function(req, res) {

    pool.getConnection((err, connection) => {
        if (err) throw err


        const savaites_diena = req.body.savaites_diena
        const id = req.params.id

        console.log(savaites_diena)

        connection.query('UPDATE diena SET savaites_diena = ? WHERE id = ?', [savaites_diena, id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                console.log(`Day has been added.`)
                res.redirect('back')
            } else {
                console.log(err)
            }

        })

    })
});

//Delete one entry from diena by id
app.get('/deleteDay/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('DELETE FROM diena WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send("deleted")
            } else {
                console.log(err)
            }

            console.log('data: \n', rows)
        })
    })
});

//
//Uzimtumo_laikas backend
//

//GET all entries from uzimtumo_laikas
app.get('/getAllTime', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM savaite', (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            res.send(rows);
        });
    })
});

//GET one uzimtumo_laikas
app.get('/getTime/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM uzimtumo_laikas WHERE id = ?', [req.params.id], (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (Object.keys(rows).length === 0){
                return res.status(404).send('NotFound')
            }
            res.send(rows);
        });
    })
});

//Insert one entry to uzimtumo_laikas
app.post('/newTime', function(req, res) {

    console.log(req.body)

    pool.getConnection((err, connection) => {
        if (err) throw err


        const pradzia = req.body.pradzia
        const pabaiga = req.body.pabaiga
        const asmenu_kiekis = req.body.asmenu_kiekis


        connection.query('INSERT INTO uzimtumo_laikas SET pradzia = ?, pabaiga = ?, asmenu_kiekis = ? ', [pradzia, pabaiga, asmenu_kiekis], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                console.log(`Time has been added.`)
                res.redirect('back')
            } else {
                console.log(err)
            }

        })

    })
});

//UPDATE uzimtumo_laikas entry by id
app.put('/updateTime/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        const pradzia = req.body.pradzia
        const pabaiga = req.body.pabaiga
        const asmenu_kiekis = req.body.asmenu_kiekis

        connection.query('UPDATE uzimtumo_laikas SET pradzia = ?, pabaiga = ?, asmenu_kiekis = ? WHERE id = ?', [pradzia, pabaiga, asmenu_kiekis, id], (error, results) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (results.changedRows === 0){
              return res.status(404).send('NotFound')
          }
            res.status(200).json({pradzia: pradzia, pabaiga: pabaiga, asmenu_kiekis: asmenu_kiekis})
        })
    })
});

//DELETE uzimtumo_laikas entry by id
app.delete('/deleteTime/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('DELETE FROM savaite WHERE id = ?', [req.params.id], (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (rows.affectedRows === 0){
                return res.status(404).send('NotFound')
            }
            res.status(204).end();
        });
    })
});

//
//Savaite backend
//

//GET all entries from savaite
app.get('/weeks', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM savaite', (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            res.send(rows);
        });
    })
});

//GET all savaites tvarkarastis
app.get('/getweekSchedule', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM savaites_diena INNER JOIN diena on diena.id = savaites_diena.id_diena', (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            res.send(rows);
        });
    })
});

//GET one entry from savaite
app.get('/weeks/:weekId', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('SELECT * FROM savaite WHERE id = ?', [req.params.weekId], (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (Object.keys(rows).length === 0){
                return res.status(404).send('NotFound')
            }
            res.send(rows);
        });
    })
});

//POST savaite entry
app.post('/weeks', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        const weekNumber = req.body.weekNumber;
        const isActive = req.body.isActive;
        const room = req.body.room;

        connection.query('INSERT INTO savaite SET id = ?, active = ?, id_patalpa = ?', [weekNumber, isActive, room], (error, results) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).json({weekNumber: weekNumber, isActive: isActive, room: room})
        });
    })
});

//UPDATE savaite entry
app.put('/weeks/:weekId', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        // const weekNumber = req.body.weekNumber;
        const weekNumber = req.params.weekId;
        const isActive = req.body.isActive;
        const room = req.body.room;

        connection.query('UPDATE savaite SET active = ?, id_patalpa = ? WHERE id = ?', [isActive, room, weekNumber], (error, results) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (results.changedRows === 0){
              return res.status(404).send('NotFound')
          }
            res.status(200).json({weekNumber: weekNumber, isActive: isActive, room: room})
        })
    })
});

//DELETE savaite entry
app.delete('/weeks/:weekId', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err){
            return res.status(500).send('Internal Server Error');
        }
        connection.query('DELETE FROM savaite WHERE id = ?', [req.params.weekId], (error, rows) => {
            connection.release();
            if (error){
                return res.status(500).send('Internal Server Error');
            }
            if (rows.affectedRows === 0){
                return res.status(404).send('NotFound')
            }
            res.status(204).end();
        });
    })
});



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