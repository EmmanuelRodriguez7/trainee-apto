const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

const { body } = require('express-validator');
const { post_libro, get_libro, put_libro, delete_libro } = require('../controllers/libro-controller.js');

router.post('/', 
    body('title', 'Campo vacio').exists().not().isEmpty(),
    body('pages', 'Campo vacio').exists().not().isEmpty(),
    body('date', 'Campo vacio').exists().not().isEmpty(),
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads'
    }),
    post_libro);

router.get('/', get_libro);

router.put('/:id_book', put_libro);

router.delete('/:id_book', delete_libro);

module.exports = router;

