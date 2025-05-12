"use client";

import React from 'react'
import { UserHook } from '../../components/hooks/user-hook';
import Link from 'next/link';
import { AuthHook } from '@/components/hooks/auth-hook';
import { useRouter } from "next/navigation";

const page = () => {
  const { userQuery } = UserHook();
  const { signOutMutation } = AuthHook();
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Dashboard</h1>
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">ID:</span>{' '}
            <span className="text-gray-900">{userQuery.data?.id}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Username:</span>{' '}
            <span className="text-gray-900">{userQuery.data?.username}</span>
          </div>
        </div>
        <button
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            signOutMutation.mutate();
            router.refresh(); 
            setTimeout(() => router.push("/auth/signin"), 1000);
          }}
        >
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default page;