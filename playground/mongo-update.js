const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB Server');
   
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5a73d62d2c51063c2cf98d50')
//    }, {
//       $set : {
//           completed : true
//       }
//    }, {
//        returnOriginal : false
//    }).then((result) => {
//        console.log(result);
//    })

db.collection('/Users').findOneAndUpdate({
    _id: new ObjectID('5a73ed9e41eabc3ce16e69ad')
}, {
   $set : {
       name : 'Rama Krishna'
   },
   $inc : {
       age : 1
   }
}, {
    returnOriginal : false
}).then((result) => {
    console.log(result);
})

    // db.close();

})