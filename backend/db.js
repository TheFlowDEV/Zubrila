import { MongoClient } from 'mongodb';
let mongoClient;
export async function getMongoClient(uri) {
    if (mongoClient) return mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB...');
        await mongoClient.connect();
        console.log('Connected to MongoDB');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB failed!', error);
        process.exit();
    }
}
