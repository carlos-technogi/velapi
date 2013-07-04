var express = require('express');
var mongo = require('mongoskin');

var conn = mongo.db('moguelator:#####@dharma.mongohq.com:10049/vel-api-01');

var app = express();
 
app.get('/api/0_1/login', function(req, res) {
    console.log("logging in");
    conn.collection('users').find({username:req.query.user,password:req.query.pass}).toArray(function (err, users) {
        if(err){
           res.status(500).send({status:"error",desc:err.errmsg}); 
           return;
        }
        
        
        if(typeof users === "undefined"|| users.length===0){
            res.status(401).send({status:"false"});
        }else{
            res.send({status:"ok",sessionid:"78977687"});
        }
    });
        
});

app.get('/api/0_1/register', function(req, res) {
    console.log("register");
    var user = req.query.user;
    var pass = req.query.pass;
    var email = req.query.email;
    
    if(!user||!pass||!email){
        res.status(412).send({status:"error",desc:"missing arguments"})
    }
    conn.collection('users').insert({username:user,password:pass,email:email}, function(err, result) {
        if (err) {
            res.status(500).send({status:"error",desc:err.errmsg}); 
            return;
        }
        res.send({status:"ok",result:result})
    });
        
});

app.get('/api/0_1/users', function(req, res) {
    console.log("users");
    conn.collection('users').find().toArray(function (err, users) {
        if(err){
           res.status(500).send({status:"error",desc:err.errmsg}); 
           return;
        }
        
        
        if(typeof users === "undefined"|| users.length===0){
            res.status(401).send({status:"false"});
        }else{
            res.send({status:"ok",users:users});
        }
    });
        
});



app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 
app.listen(process.env.PORT);
console.log('Listening on port '+process.env.PORT+'...');
