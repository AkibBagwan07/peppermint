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
        const response = await fetch("https://peppermint-vlec.onrender.com/enteries");
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
      const response = await fetch("https://peppermint-vlec.onrender.com/enteries", {
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
      const response = await fetch(`https://peppermint-vlec.onrender.com/entries/${id}`, {
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
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-teal-900 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <h1 className="text-3xl font-semibold">Expense Tracker</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-teal-300">Dashboard</a></li>
            <li><a href="#" className="hover:text-teal-300">Add Entry</a></li>
            <li><a href="#" className="hover:text-teal-300">View Entries</a></li>
          </ul>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-teal-800 text-white p-6 hidden lg:block">
          <nav>
            <ul>
              <li className="mb-6 text-lg">
                <a href="#" className="hover:text-teal-300">Dashboard</a>
              </li>
              <li className="mb-6 text-lg">
                <a href="#" className="hover:text-teal-300">Add Entry</a>
              </li>
              <li className="mb-6 text-lg">
                <a href="#" className="hover:text-teal-300">View Entries</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Section in Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-green-500 hover:scale-105 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
              <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-red-500 hover:scale-105 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
              <p className="text-3xl font-bold text-red-600">${totalExpense}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-blue-500 hover:scale-105 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
              <p className="text-3xl font-bold text-blue-600">${balance}</p>
            </div>
          </div>

          {/* Add Entry Form */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add your Expenses/Income</h2>
            <AddEntryForm onAddEntry={handleAddEntry} />
          </div>

          {/* Entries List */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Entries</h2>
            <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-teal-600 text-white rounded-full p-4 shadow-xl hover:bg-teal-700 transition duration-300 transform hover:scale-110"
        >
          <span className="material-icons">add</span>
        </button>
      </div>
    </div>
  );
};

export default App;
