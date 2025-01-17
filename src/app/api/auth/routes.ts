import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: 'Admin' | 'Mitra';
}

let users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ENCRYPTION_SECRET =
  process.env.ENCRYPTION_SECRET || 'your_encryption_secret';

export async function POST(req: Request) {
  const { action, name, phone_number, email, password, role } =
    await req.json();

  if (action === 'register') {
    const userExists = users.some(
      (user) => user.email === email || user.phone_number === phone_number,
    );
    if (userExists) {
      return NextResponse.json(
        { message: 'Email or phone number already registered.' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: users.length + 1,
      name,
      phone_number,
      email,
      password: hashedPassword,
      role,
    };
    users.push(newUser);

    return NextResponse.json({ message: 'User registered successfully.' });
  }

  if (action === 'login') {
    const user = users.find(
      (user) =>
        (user.email === email || user.phone_number === phone_number) &&
        bcrypt.compareSync(password, user.password),
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email/phone number or password.' },
        { status: 401 },
      );
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      ENCRYPTION_SECRET,
    ).toString();

    return NextResponse.json({
      message: 'Login successful.',
      token: encryptedToken,
    });
  }

  return NextResponse.json({ message: 'Invalid action.' }, { status: 400 });
}
