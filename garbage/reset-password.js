const express = require("express");
const { recoverPassword } = require("../src/controllers/fun.controllers");

const router = express.Router();

router.use(express.json());

router.post("/recover-password", recoverPassword);

module.exports = router;
