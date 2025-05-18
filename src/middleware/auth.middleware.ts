import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.utils';
import { getCurrentUser } from '../services/auth.service';




export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Authentication token required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    const user = await getCurrentUser(decoded.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};