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
      const response = await fetch(`https://peppermint-e4z7.onrender.com/${id}`, {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center  text-teal-600 mb-6">
        Expense Tracker
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">${totalIncome}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">${totalExpense}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
          <p className="text-2xl font-bold text-blue-600">${balance}</p>
        </div>
      </div>

      <AddEntryForm onAddEntry={handleAddEntry} />
      <EntryList entries={entries} onDeleteEntry={handleDeleteEntry} />
    </div>
  );
};

export default App;
