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
    pool.query(`SELECT * FROM usersTable WHERE userId=${req.params['userId']}`, (err, rows) => {
        console.log('rows ->', rows);
        res.json(rows);
    });
});
app.post('/setNewNote', (req, res) => {
    pool.query(`INSERT INTO notesTable (noteTitle, noteText, noteCreationDate, noteForDate, userId) VALUES
                     (${req.body['noteTitle']},
                      ${req.body['noteText']},
                      ${new Date()},
                      ${req.body['reservedDate']},
                      ${req.body['userId']});`,
        (err, rows) => {
            res.json({status: !err});
        }
    );
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});