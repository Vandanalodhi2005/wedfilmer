
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyToken(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey12345';
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
