import React from "react";
import EntryItem from "./EntryItem";

const EntryList = ({ entries, onDeleteEntry }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-sm">No entries available.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <EntryItem
              key={entry._id}
              entry={entry}
              onDeleteEntry={onDeleteEntry}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;
