'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const BASE_URL = 'http://localhost:9000/api_v1';

const RegisterForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          fullname,
          email,
          password,
          phone_number: phoneNumber,
          role,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      alert('Registration successful!');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col space-y-4 max-w-md mx-auto"
    >
      <h1 className="text-xl font-bold">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <Input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Mitra">Mitra</option>
      </select>
      <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
