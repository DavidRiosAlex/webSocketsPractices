import { MongoClient } from 'mongodb';

function DB (){
    this.client = new MongoClient(process.env.MONGO_CONNECTION_URI);
};

DB.prototype.connect = async function () {
    await this.client.connect();
    const database = this.client.db('myFirstDatabase');
    return database;
};

export default DB;
