"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const firebase_1 = require("../config/firebase");
class AuthService {
    static async getUser(email) {
        const snapshot = await firebase_1.db.collection('users').where('email', '==', email).get();
        if (snapshot.empty)
            return null;
        return { id: snapshot.docs[0].id, email };
    }
    static async createUser(email) {
        const docRef = await firebase_1.db.collection('users').add({ email });
        return { id: docRef.id, email };
    }
}
exports.AuthService = AuthService;
