import React, { useState, useEffect } from "react";
import EntryList from "./components/EntryList";
import AddEntryForm from "./components/Form";

const App = () => {
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("https://peppermint-e4z7.onrender.com/enteries");
        const data = await response.json();
        setEntries(data);

        const income = data
          .filter((e) => e.type === "Income")
          .reduce((sum, e) => sum + e.amount, 0);
        const expense = data
          .filter((e) => e.type === "Expense")
          .reduce((sum, e) => sum + e.amount, 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleAddEntry = async (newEntry) => {
    try {
      const response = await fetch("https://peppermint-e4z7.onrender.com/enteries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        const savedEntry = await response.json();
        setEntries([...entries, savedEntry]);

        if (newEntry.type === "Income") {
          setTotalIncome((prev) => prev + newEntry.amount);
        } else {
          setTotalExpense((prev) => prev + newEntry.amount);
        }
        setBalance((prev) =>
          newEntry.type === "Income"
            ? prev + newEntry.amount
            : prev - newEntry.amount
        );
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch(`https://peppermint-e4z7.onrender.com/entries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deletedEntry = entries.find((e) => e._id === id);
        setEntries(entries.filter((e) => e._id !== id));

        if (deletedEntry.type === "Income") {
          setTotalIncome((prev) => prev - deletedEntry.amount);
        } else {
          setTotalExpense((prev) => prev - deletedEntry.amount);
        }
        setBalance((prev) =>
          deletedEntry.type === "Income"
            ? prev - deletedEntry.amount
            : prev + deletedEntry.amount
        );
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-800 text-white p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Expense Tracker</h1>
        <nav>
          <ul>
            <li className="mb-4 text-lg">
              <a href="#" className="hover:text-teal-300">Dashboard</a>
            </li>
            <li className="mb-4 text-lg">
              <a href="#" className="hover:text-teal-300">Add Entry</a>
            </li>
            <li className="mb-4 text-lg">
              <a href="#" className="hover:text-teal-300">View Entries</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Stats Section in Row Layout */}
        <div className="flex justify-between gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-1/3 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
            <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-1/3 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
            <p className="text-3xl font-bold text-red-600">${totalExpense}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-1/3 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
            <p className="text-3xl font-bold text-blue-600">${balance}</p>
          </div>
        </div>

        {/* Add Entry Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Entry</h2>
          <AddEntryForm onAddEntry={handleAddEntry} />
        </div>

        {/* Entries List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Entries</h2>
          <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-12 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-teal-600 text-white rounded-full p-4 shadow-xl hover:bg-teal-700 transition duration-300"
          >
            <span className="material-icons">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
