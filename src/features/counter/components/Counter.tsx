import React from 'react';
import { useCounter } from '../hooks';

export const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Counter</h2>
      <div className="text-4xl font-bold text-blue-600">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
};
