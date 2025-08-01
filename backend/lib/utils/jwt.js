"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "hlT8Gp5iuNjCq0LLTxjUDXKnGaxD9EzJfJf7rFgNrXA=";
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        console.error('Token verification failed:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error('Authentication failed: Token expired.');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error('Authentication failed: Invalid token.');
        }
        else {
            throw new Error('Authentication failed: An unexpected error occurred.');
        }
    }
}
