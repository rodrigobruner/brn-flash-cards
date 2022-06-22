import React from 'react';

export default function Error({ children: errorMessage }) {
  return (
    <div className="bg-red-300 text-red-900 font-semibold p-2 m-2">
      {errorMessage}
    </div>
  );
}
