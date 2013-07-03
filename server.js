var express = require('express');
var mongo = require('mongoskin');

var conn = mongo.db('moguelator:yvk80co@dharma.mongohq.com:10049/vel-api-01');

var app = express();
 
app.get('/api/0_1/login', function(req, res) {
    console.log("logging in");
    conn.collection('users').find({username:req.query.user,password:req.query.pass}).toArray(function (err, users) {
        if(err){
           res.status(500).send({status:"error",desc:err.errmsg}); 
        }
        
        
        if(typeof users === "undefined"|| users.length===0){
            res.status(401).send({status:"false"});
        }else{
            res.send({status:"ok",sessionid:"78977687"});
        }
    });
        
});


app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 
app.listen(process.env.PORT);
console.log('Listening on port '+process.env.PORT+'...');