import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const user = await AuthService.getUser(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
  
  static async register(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const user = await AuthService.createUser(email);
      const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
}
