const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');

// var _id = '5a7bcf2b1c35197414a2a900';



// if(!ObjectID.isValid(_id)){
//     console.log('ID is not valid.');
// }

// Todo.find({
//     "completedAt" : null
// }).then((todos) => {
//     console.log('Todos : ', todos);
// });


// Todo.findOne({
//     _id
// }).then((todo) => {
//     console.log('Todo : ',todo);
// });


// Todo.findById(_id).then((todo) => {

//     if(!todo) return console.log(" ID not found");

//     console.log(" Todo By ID : ", todo);

// }).catch((e) => console.log(e));


var _id = "5a7d049ae4aa76005c992020";

User.findById(_id).then((user) => {
    if(!user) return console.log(" User not found");

    console.log(" User by ID : ", user);
}).catch((e) => console.log(e));