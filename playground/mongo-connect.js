// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

var user = {
    name: 'Rama',
    age: 25,
    location: 'Greensboro'
}

var { name } = user;
console.log("Property using destruct : " + name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB Server');

    // db.collection('Todos').insertOne({
    //     text: 'Get a Mac Book.',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo : ', err);
    //     }
    //    console.log(JSON.stringify(result.ops, undefined, 4));
    // })

    db.collection('/Users').insertOne({
        name: 'Rama Krishna',
        age: 25,
        skill: 'barely Java.'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert into Users: ', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 4));
        console.log('TimeStamp Of document creation : ' + result.ops[0]._id.getTimestamp());
    });

    db.close();

})