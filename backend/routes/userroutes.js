const express = require("express");
const router = express.Router();
const {
  getEnteries,
  addEnteries,
  deleteEnteries,
  checkBalance,
} = require("../controllers/usercontoller");


router.get("/enteries",getEnteries)
router.post('/enteries',addEnteries)
router.delete("/entries/:id",deleteEnteries)
router.get("/balance",checkBalance)

module.exports=router