const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB Server');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5a73d62d2c51063c2cf98d50")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,6));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos Count : ' + count);

    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    db.collection('/Users').find({
        name: 'Rama Krishna'
    }).toArray().then((docs) => {
        console.log('Todos Count : ' + docs.length);
        console.log(JSON.stringify(docs, undefined, 4));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    db.close();

})