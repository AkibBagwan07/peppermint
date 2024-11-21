import React from 'react'

const Balance = ({balance}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Net Balance</h2>
          <p
            className={`text-3xl font-bold ${
              balance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${balance}
          </p>
        </div>
      );
}

export default Balance
