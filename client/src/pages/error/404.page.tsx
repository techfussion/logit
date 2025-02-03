import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for does not exist.
      </p>
      <div className='flex gap-4'>
        <Button
            variant="link"
            className="mt-6 px-4 py-2 underline hover:text-blue-700"
            onClick={() => navigate('/')}
        >
            Back to Home
        </Button>
        <Button
            variant="link"
            className="mt-6 px-4 py-2 underline hover:text-blue-700"
            onClick={() => navigate('/engine/overview')}
        >
            Back to Engine
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
