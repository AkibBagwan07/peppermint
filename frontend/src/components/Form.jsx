import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';

const EntryForm = ({ onAddEntry }) => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("Income");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!amount || !description || !date) {
        alert("Please fill in all fields.");
        return;
      }
      onAddEntry({ amount: parseFloat(amount), description, date, type });
      setAmount("");
      setDescription("");
      setDate("");
    };
  
    return (
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <Button 
        type="submit"
        className="w-40 mt-10 flex items-center justify-center bg-teal text-white py-3 mt-4 rounded-md  transition"
        variant="contained">Add</Button>
      </form>
    );
}

export default EntryForm
