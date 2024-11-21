const User=require("../models/userschema")


const getEnteries=async(req,res)=>{
    try {
        const entries=await User.find()
        res.status(200).json(entries)
    } catch (error) {
        console.log('error',error)
    }
}


const addEnteries=async (req,res)=> {
    try {
        const { amount, description, date, type } = req.body;
    
        if (!amount || !description || !date || !type) {
          return res.status(400).json({ error: "All fields are required" });
        }
    
        const entry = new User({ amount, description, date, type });
        await entry.save();
    
        res.status(201).json(entry);
      } catch (error) {
        res.status(500).json({ error: "Failed to create entry" });
      }
}

const deleteEnteries=async(req,res)=>{
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Entry deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete entry" });
      }
}

const checkBalance=async (req,res) => {
    try {
        const entries = await User.find();
        const income = entries.filter((e) => e.type === "Income").reduce((sum, e) => sum + e.amount, 0);
        const expense = entries.filter((e) => e.type === "Expense").reduce((sum, e) => sum + e.amount, 0);
        const netBalance = income - expense;
        res.status(200).json({ netBalance });
      } catch (error) {
        res.status(500).json({ error: "Failed to calculate balance" });
      }
}

module.exports={
    getEnteries,
    addEnteries,
    deleteEnteries,
    checkBalance
}