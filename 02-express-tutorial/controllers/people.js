let {people} = require("../data")

const getPeople = (req, res) => {
    res.json(people);
}

const getPerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find((p) => p.id === id);

    if (!person) {
        return res.status(404).send("That person was not found.");
    }

    res.status(200).json(person);
}


const addPerson = (req, res) => {
    if (!req.body.name) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a name" });
      }
    
      const newPerson = {id: people.length + 1, name: req.body.name}
      people.push(newPerson);
    
      res.status(201).json({success: true, name: req.body.name})
}

const editPerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find((p) => p.id === id);
    if (!person) {
        return res
          .status(404)
          .json({ success: false, message: `Person with id ${id} was not found.` });
    }

    if (!req.body.name) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a name" });
      }
    person.name = req.body.name;
    res.status(200).json({success: true, person})
}

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find((p) => p.id === id);
    if (!person) {
        return res
          .status(404)
          .json({ success: false, message: `Person with id ${id} was not found.` });
    }

    people = people.filter((p) => p.id !== id);
    res.status(200).json({success: true, data: people})
}

module.exports = {
    getPeople,
    addPerson,
    getPerson,
    editPerson,
    deletePerson,
}