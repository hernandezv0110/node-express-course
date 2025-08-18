const express = require("express");
const router = express.Router();

const { addPerson, getPeople, getPerson, editPerson, deletePerson } = require("../controllers/people.js");

router.get("/", getPeople);

router.get("/:id", getPerson);

router.post("/", addPerson);

router.put("/:id", editPerson);

router.delete("/:id", deletePerson);

module.exports = router;