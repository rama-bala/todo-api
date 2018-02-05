const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB Server');
   
    //  db.collection("Todos").deleteMany({text:'do Laundry'}).then((result) => {
    //      console.log("Result of delete many : "+result);
    //  }, (err) => {
    //      console.log("Error Deleting Entry from Todo Collection : "+err);
    //  });
   
    //  db.collection("Todos").deleteOne({text:'do Laundry'}).then((result) => {
    //     console.log("Result of delete One : "+result);
    // }, (err) => {
    //     console.log("Error Deleting Entry from Todo Collection : "+err);
    // });
    
    // db.collection("Todos").findOneAndDelete({completed:true}).then((result) => {
    //     console.log("Result of delete find One and Delete : ");
    //     console.log(result);
    // }, (err) => {
    //     console.log("Error Deleting Entry from Todo Collection : "+err);
    // });

    // db.collection("/Users").deleteMany({name:'Rama Krishna'}).then((result) => {
    //     console.log('Result from deletemany Users : ')       
    //     console.log(result);   
    // })
    
    db.collection("/Users").findOneAndDelete({_id: new ObjectID("5a73eda7312e3c3ce57f3db3")}).then((result) => {
        console.log('Result from find One And Delete : ');
        console.log(result);
    })


    // db.close();

})