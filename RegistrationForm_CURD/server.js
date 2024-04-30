const express = require('express');
const session = require('express-session');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'curd',
    insecureAuth:true,
});

db.connect((err)=>{
    if(err){
        console.error('Database connection failed:', err.stack);
    }else{
        console.log('Connected to database');
    }
});

app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('registration.ejs');
})

app.post('/register', (req, res) => {
    const {username,password} = req.body;
    
    console.log(username);

    const query = 'INSERT INTO users (username,password) VALUES(?,?)';

    db.query(query,[username,password], (err)=>{
        if(err) throw err;
        if (results.length > 0) {
            req.session.username = username;
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            req.session.username = username;
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    });
});


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(query, [username, password], (err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.get('/home', (req, res) => {
    if (req.session.username) {
        res.render('home.ejs', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
});
app.get('/home', (req, res) => {
    if (req.session.username) {
        res.render('home.ejs', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



app.listen(1001,()=>{
    console.log('Server is running on port 1001');
})