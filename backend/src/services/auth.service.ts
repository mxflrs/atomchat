import { db } from '../config/firebase';
import { User } from '../models/auth.models';

export class AuthService {

    static async getUser(email: string): Promise<User | null> {
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, email } as User;
    }
    
    static async createUser(email: string): Promise<User> {
        const docRef = await db.collection('users').add({ email });
        return { id: docRef.id, email };
    }
}