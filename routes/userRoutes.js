const express = require("express");
const userController = require(`../controllers`);

const router = express.Router();

//Routes
router.get("/", userController.getCompany);
router.post("/insert", userController.addCompany);
router.post("/delete", userController.deleteCompany);
module.exports = router;
