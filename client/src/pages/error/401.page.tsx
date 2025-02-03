import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">401 - Unauthorized</h1>
      <p className="mt-4 text-lg text-gray-600">
        You are not authorized to access this page.
      </p>
      <div className='mt-4 text-xs'>
        <p className='text-normal'>Posible reasons</p>
        <ul className="text-gray-600">
          <li>Your loggin session might have expired</li>
          <li>You do not have right to access the resource</li>
        </ul>
      </div>
      
      <Button
        variant="link"
        className="mt-6 px-4 py-2 underline hover:text-blue-700"
        onClick={() => navigate('/')}
      >
            Back to Home
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
