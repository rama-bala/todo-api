var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
   
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    })


})


app.get('/todos', (req,res) => {
    
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos/:id', (req,res) => {
        var _id= req.params.id;

        if(!ObjectID.isValid(_id)){
            res.status(404).send({
                error: "Id is not valid"
            });
            return
        }

        Todo.findById(_id).then((todo) => {
            if(!todo) return res.status(404).send({error : "Todo not found in mongoDB"});
            res.send({todo});

        })


});

app.delete('/todos/:id', (req,res) => {
    var _id = req.params.id;
    
    if(!ObjectID.isValid(_id)){
        res.status(404).send({
            error: "Id is not valid"
        });
        return
    }

    Todo.findByIdAndRemove(_id).then((todo) => {
        if(!todo) return res.status(404).send({error : "Todo not found in mongoDB"});
        res.send({todo});

    }).catch((e) => {
        res.status(404).send(e);
    })


})


app.listen(port, ()=> {
    console.log(`Server started listening on port ${port}`);
});

module.exports = {app};