const express = require('express');
const app = express();
const sql = require('mssql');
const port = 3000;
const config = require('./config');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/first', async (req, res) => {
    var con = await new sql.ConnectionPool(config.connectionstring);
    await con.connect();
    var request = await new sql.Request(con);
    var recordset = await request
        .input('userId', req.query.userId)
        .execute('dataview');
    console.log(recordset.recordsets[0]);
    return res.status(200).json(recordset.recordset[0]);
});

app.post('/two', async (req, res) => {
    var con = await new sql.ConnectionPool(config.connectionstring);
    await con.connect();
    var request = await new sql.Request(con);
    var recordset = await request
        .input('userId', sql.VarChar, req.body.userId)
        .input('street', sql.VarChar, req.body.street)
        .input('city', sql.VarChar, req.body.city)
        .input('district', sql.VarChar, req.body.district)
        .input('pincode', sql.VarChar, req.body.pincode)
        .execute('datainsert');
    if (recordset.recordset[0].errormessege == 'success') {
        var result = {
            status: 'success',
            messege: '1 row inserted',
            userId: recordset.recordset[0].userId
        }
        return res.status(200).json(result);
    }
    else {
        var result = {
            status: 'error',
            messege: recordset.recordset[0].errormessege
        }
        return res.status(200).json(result);
    }

});
app.put('/three', async (req, res) => {
    var con = await new sql.ConnectionPool(config.connectionstring);
    await con.connect();
    var request = await new sql.Request(con);
    var recordset = await request
        .input('userId', req.body.userId)
        .input('street', sql.VarChar, req.body.street)
        .input('city', sql.VarChar, req.body.city)
        .input('district', sql.VarChar, req.body.district)
        .input('pincode', sql.VarChar, req.body.pincode)
        .execute('dataupdate');    
    return res.status(200).json(recordset.recordset[0]);
});
app.post('/login', async (req, res) => {
    var con = await new sql.ConnectionPool(config.connectionstring);
    await con.connect();
    var request = await new sql.Request(con);
    var recordset = await request
    .input('emailId', sql.VarChar, req.body.emailId)
    .input('password', sql.VarChar, req.body.password)
    .execute('passwordcheck'); 
    if (recordset.recordset[0].errormessege == 'logged in') {
        var result = {
            status: 'success',
            messege: 'you logged in',
            data :recordset.recordsets[1]
        }
        return res.status(200).json(result); 
    }  
    else{
        var result = {
            status: 'error',
            messege: recordset.recordset[0].errormessege
        }
        return res.status(200).json(result);
    }
  
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});