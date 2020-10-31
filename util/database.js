const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asova:nodecomplete@cluster0.pv5vz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoConnect = (callback) => {
    client.connect()
        .then(client => {
            console.log('=========');
            console.log('Result: ', client);
            console.log('Was connected');
            callback(client);
        })
        .catch(err => console.log(err));
};

module.exports = mongoConnect;