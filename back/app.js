const express = require('express');
const bodyParser = require('body-parser');
const corsParser = require('cors');
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'thinkspace'
});
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(corsParser());

app.get('/getAllNotes/:userId', (req, res) => {
    pool.query(`SELECT * FROM notesTable WHERE userId=${req.params['userId']}`, (err, rows) => {
        res.json(rows);
    });
});
app.post('/setNewNote', (req, res) => {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const reservationDate = req.body['noteForDate']
        ? `'${req.body['noteForDate']}'`
        : 'NULL' ;

    pool.query(`INSERT INTO notesTable (noteTitle, noteText, noteCreationDate, noteForDate, userId) VALUES
                     ('${req.body['noteTitle']}',
                      '${req.body['noteText']}',
                      '${currentDateString}',
                      ${reservationDate},
                      ${req.body['userId']});`,
        (err, rows) => {
            console.log(err);
            res.json({status: !err, newRowId: rows.insertId});
        }
    );
});
app.put('/updateNote/:noteId', (req, res) => {
    const reservationDate = req.body['noteForDate']
        ? `'${req.body['noteForDate']}'`
        : 'NULL' ;

    pool.query(`UPDATE notesTable 
                    SET noteTitle='${req.body['noteTitle']}', noteText='${req.body['noteText']}', noteForDate=${reservationDate}
                    WHERE noteId=${req.params['noteId']}`,
        (err, rows) => {
            res.json({status: !err, updatedNoteId: req.params['noteId']})
        }
    )

})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});