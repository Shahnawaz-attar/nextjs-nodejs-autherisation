'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});
  const handleLogout = async () => {
    const response = await axios.get('/api/users/logout');

    if (response.data.status) {
      console.log(response.data.message);
      router.push('/login');
    }

    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const data = await axios.get('/api/users/me');
      const user = data.data.userData;
      setUserData({ ...user });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      ProfilePage
      <hr />
      <div>
        {Object.keys(userData).length == 0 ? (
          'Loading...'
        ) : (
          <div>
            Welcome
            <Link
              href={`/profile/${userData._id}`}
              className="text-blue-400 cursor-pointer mx-2"
            >
              {userData.username}
            </Link>
          </div>
        )}
      </div>
      <hr />
      <hr />
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-600 rounded mt-2 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
