var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text : {
        type : String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    completed : {
        type : Boolean,
        default: false
    }, 
    completedAt : {
        type : Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text : 'do Laudry',
//     completed: true,
//     completedAt: Math.floor(new Date() / 1000)
// });

var newTodo = new Todo({text : ' Clean headlights of Car. '})

newTodo.save().then((doc) => {
    console.log('Saved Document to mongo db.');
    console.log(doc);
}, (e) => {
    console.log('There was an error saving object to mongo DB ',e);
})

var User = mongoose.model('User', {
    name : {
        type : String
    }, 
    email : {
        type : String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var newUser = new User({name : 'Rama Krishna',
                        email: 'ramabala.java@gmail.com'});
newUser.save().then((doc)=> {
    console.log('Saved Object User into mongo DB : '+ doc);
}, (e) => {
    console.log('There was an error saving object to mongo DB : ', err);
})
