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
    pool.query(`INSERT INTO notesTable (noteTitle, noteText, noteCreationDate, noteForDate, userId) VALUES
                     ('${req.body['noteTitle']}',
                      '${req.body['noteText']}',
                      '${currentDateString}',
                      ${`'${req.body['noteForDate']}'` ?? 'NULL'},
                      ${req.body['userId']});`,
        (err, rows) => {
            res.json({status: !err, newRowId: rows.insertId});
        }
    );
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});