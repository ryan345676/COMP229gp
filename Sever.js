var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

var db = mongo.connect("mongodb+srv://ryan:ryan2002@cluster0.0bfccxu.mongodb.net/test",function(err,response){
    if(err){ console.log(err);}
    else{ console.log('Connected to '+ db, '+',response);}
});

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req,res,next){
        res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT ,PATCH , DELETE');
        res.setHeader('Access-Control-Allow-Headers','X-Requested_with,content-type');
        res.setHeader('Access-Control-Allow-Credentials',true);
    });

    var Schema =mongo.Schema;

var UsersSchema =new Schema({
    id: {type:int}, owner: {type:String}, title: {type:String}, type: {type:String},startdate: {type:String},enddate: {type:String},
    q1:{type:String},q2:{type:String},q3:{type:String},q4:{type:String},q5:{type:String}},{versionKey: false
});

var model = mongo.model('users',UsersSchema,'users');

app.post("/api/save")
