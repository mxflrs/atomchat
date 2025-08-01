"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = "hlT8Gp5iuNjCq0LLTxjUDXKnGaxD9EzJfJf7rFgNrXA=";
class AuthController {
    static async login(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            const user = await auth_service_1.AuthService.getUser(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const token = jwt.sign({ uid: user.id }, JWT_SECRET, {
                expiresIn: '1h',
            });
            res.json({ token });
        }
        catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    }
    static async register(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            const user = await auth_service_1.AuthService.createUser(email);
            const token = jwt.sign({ uid: user.id }, JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(201).json({ token });
        }
        catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    }
}
exports.AuthController = AuthController;
