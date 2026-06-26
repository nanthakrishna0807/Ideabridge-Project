const { MongoClient } = require('mongodb');
const url = 'mongodb://Nanthuserver08:Nantha2006@ac-kinpodb-shard-00-00.8hykeds.mongodb.net:27017,ac-kinpodb-shard-00-01.8hykeds.mongodb.net:27017,ac-kinpodb-shard-00-02.8hykeds.mongodb.net:27017/ideabridge?ssl=true&replicaSet=atlas-cb8v4p-shard-0&authSource=admin&appName=Cluster0';
const client = new MongoClient(url);
async function test() {
    try {
        await client.connect();
        console.log('Connected correctly to server');
        await client.close();
    } catch (err) {
        console.error(err);
    }
}
test();
