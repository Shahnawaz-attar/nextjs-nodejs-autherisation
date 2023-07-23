import React from 'react';

const UserProfilePage = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 ">
      <h1>Profiler user id {params.id}</h1>
    </div>
  );
};

export default UserProfilePage;
