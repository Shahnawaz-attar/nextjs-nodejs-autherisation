'use client';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const verifyEmail = async () => {
    try {
      const { data } = await axios.post('/api/users/verifyemail', { token });
      if (data.code === 'already') {
        setMessage('You are already verified');
      }
      if (data.status) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(error);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-">
      {(verified && `Congratulation email is verified now you can login `) ||
        'please wait....'}
      {verified && (
        <Link className="text-blue-300" href={'/login'}>
          click me
        </Link>
      )}
      {message !== '' && verified ? 'email is verified now you can login' : ''}
    </div>
  );
};

export default VerifyEmailPage;
