const express = require('express');
const session = require('express-session');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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
        res.redirect('/login');
    });
})

app.listen(1001,()=>{
    console.log('Server is running on port 1001');
})