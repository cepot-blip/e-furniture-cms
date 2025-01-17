'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const BASE_URL = 'http://localhost:9000/api_v1';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      alert('Login successful!');
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col space-y-4 max-w-md mx-auto"
    >
      <h1 className="text-xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
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
      <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
