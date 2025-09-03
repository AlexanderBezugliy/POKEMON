import { clientPromise } from '@/lib/mongodb';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';



// Название коллекции, где будут храниться данные
const collectionName = 'pokemonUserData';

export async function GET() {
    const session = await getSession();//функция от Auth0 проверяет вошел ли пользователь в систему и получает информацию о нём
    const user = session?.user;

    if (!user || !user.sub) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('pokemon_user'); //<--название базы данных на MangoDB_Atlas
        const collection = db.collection(collectionName);
        // Ищем данные пользователя по его ID (user.sub)
        const userData = await collection.findOne({ userId: user.sub });

        if (!userData) {
            return NextResponse.json({ favorites: [], saved: [] });
        }
        
        return NextResponse.json({ favorites: userData.favorites, saved: userData.saved });// Возвращаем только нужные поля
    } catch {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    const user = session?.user;

    if (!user || !user.sub) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const { favorites, saved } = await request.json();
        const client = await clientPromise;
        const db = client.db('pokemon_user');//<--название базы данных на MangoDB_Atlas
        const collection = db.collection(collectionName);

        // Ищем документ пользователя и обновляем его.
        // `upsert: true` создаст новый документ, если он не найден.
        await collection.updateOne(
            { userId: user.sub },
            { $set: { favorites, saved } },
            { upsert: true }
        );
        // console.log(`[POST] Сохранены данные для пользователя ${user.sub}`);
        return NextResponse.json({ success: true });
    } catch {
        // console.error('Ошибка при сохранении данных:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

