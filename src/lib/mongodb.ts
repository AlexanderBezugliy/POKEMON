// lib/mongodb.ts
import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) {
    throw new Error('Пожалуйста, определите переменную окружения MONGO_URI');
}

const uri = process.env.MONGO_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // В режиме разработки используем глобальную переменную,
    // чтобы не создавать новое подключение при каждом Hot Reload.
    const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // В продакшене просто создаем новое подключение.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export { clientPromise };