
const express = require('express');

// Rutas de productos
const authorsController = require("../controllers/authors.controller");
const router = express.Router();

router.get('/', authorsController.getAllAuthors);
router.get('/email', authorsController.getAuthorByEmail);
router.post('/', authorsController.createAuthor);
router.put('/', authorsController.updateAuthorByEmail);
router.delete('/', authorsController.deleteAuthorByEmail);

module.exports = router;