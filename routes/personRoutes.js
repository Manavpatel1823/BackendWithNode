const express = require("express");
const router = express.Router();

const {postPerson,
        getAllPerson,
        getPerson,
        updatePerson,
        deletePerson
    } = require("../controller/personController");

router.post('/submit', postPerson);
router.get('/submission', getAllPerson);
router.get('/submission/:id', getPerson);
router.put('/submit/:id', updatePerson);
router.delete('/submit/:id', deletePerson);

module.exports = router
