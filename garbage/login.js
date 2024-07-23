const express = require("express");

const { createLogin } = require("../src/controllers/fun.controllers");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.send("You have to Log");
});

router.post("/", createLogin);

module.exports = router;
