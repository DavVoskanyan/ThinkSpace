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

app.get('/getUserAccount/:userId', (req, res) => {
    pool.query(`SELECT * FROM usersTable WHERE userId=${req.params['userId']};`, (err, rows) => {
        res.json(rows);
    })
})
app.get('/getAllNotes/:userId', (req, res) => {
    pool.query(`SELECT * FROM notesTable WHERE userId=${req.params['userId']} AND deleted=0;`, (err, rows) => {
        res.json(rows);
    });
});
app.post('/setNewNote', (req, res) => {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const reservationDate = req.body['noteForDate']
        ? `'${req.body['noteForDate']}'`
        : 'NULL' ;

    pool.query(`INSERT INTO notesTable (noteTitle, noteText, noteCreationDate, noteForDate, userId, deleted) VALUES
                     ('${req.body['noteTitle']}',
                      '${req.body['noteText']}',
                      '${currentDateString}',
                      ${reservationDate},
                      ${req.body['userId']},
                      0);`,
        (err, rows) => {
            res.json({status: !err, newRowId: rows.insertId});
        }
    );
});
app.post('/loginUser', (req, res) => {
    pool.query(`SELECT userId FROM usersTable 
                    WHERE userEmail='${req.body['email']}' AND userPassword='${req.body['password']}';`,
        (err, rows) => {
            res.json(rows ? rows : {});
        })
})
app.post('/signupUser', (req, res) => {
    pool.query(`SELECT * FROM usersTable WHERE userEmail='${req.body['email']}';`, (err, rows) => {
        if(!err && !rows[0]) {
            const currentDate = new Date();
            const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

            const imageName = `avatar_${Math.round(Math.random() * 6) + 1}.jpg`;

            pool.query(`INSERT INTO usersTable (userName, userEmail, userPassword, userCreationDate, imageName) VALUES
                            ('${req.body['name']}',
                             '${req.body['email']}',
                             '${req.body['password']}',
                             '${currentDateString}',
                             '${imageName}'); `,
                (err, rows) => {
                    res.json({userId: rows.insertId, isMailUsed: false});
                }
            )
        }
        else { res.json({userId: null, isMailUsed: true}); }
    })
})
app.put('/updateUser', (req, res) => {
    pool.query(`UPDATE usersTable
                    SET userName='${req.body['userName']}', userPassword='${req.body['userPassword']}', 
                    imageName='${req.body['imageName']}'
                    WHERE userId=${req.body['userId']};`,
        err => {
            res.json({status: !err})
        }
    )
});
app.put('/updateNote/:noteId', (req, res) => {
    const reservationDate = req.body['noteForDate']
        ? `'${req.body['noteForDate']}'`
        : 'NULL' ;

    pool.query(`UPDATE notesTable 
                    SET noteTitle='${req.body['noteTitle']}', noteText='${req.body['noteText']}', noteForDate=${reservationDate}
                    WHERE noteId=${req.params['noteId']};`,
        err => {
            res.json({status: !err, updatedNoteId: req.params['noteId']})
        }
    )
});
app.delete('/deleteNote/:noteId', (req, res) => {
    pool.query(`UPDATE notesTable
                    SET deleted=1
                    WHERE noteId=${req.params['noteId']};`,
        err => {
            res.json({status: !err, deletedNoteId: req.params['noteId']});
        }
    )
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});