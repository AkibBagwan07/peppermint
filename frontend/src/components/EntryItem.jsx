import React from "react";

const EntryItem = ({ entry, onDeleteEntry }) => {
  return (
    <li className="flex justify-between items-center border-b last:border-0 py-2">
      <div>
        <p className="text-gray-700 font-medium">{entry.description}</p>
        <p className="text-sm text-gray-500">{entry.date.split("T")[0]}</p>
      </div>
      <div className="flex items-center">
        <span
          className={`mr-4 ${
            entry.type === "Income" ? "text-green-500" : "text-red-500"
          }`}
        >
          ${entry.amount}
        </span>
        <button
          onClick={() => onDeleteEntry(entry._id)}
          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default EntryItem;
