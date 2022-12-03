const express = require('express');
const { connectDB } = require('../config/db.js');
const { validationResult } = require('express-validator');
const Book = require('../models/books.js');
const { return_error } = require('../helpers/helper.js');
const { uploadImage, deleteimage } = require('../config/cloudinary.js');
const fs = require('fs-extra');

const post_libro = async (req, res) => {
    try {
        const { title, pages, date } = req.body;
        const get_errors = validationResult(req);
        

        const book = new Book({
            title,
            pages,
            date
        });

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            book.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            await fs.unlink(req.files.image.tempFilePath)
        }
        
        if (!get_errors.isEmpty()) {
            const response = return_error(404, 'Error');
            return res.status(400).json(response);
        }
        
        if ( pages >= 50 && pages <= 500 ) {
            await book.save();
            return res.status(200).json({
                ok: true,
                message: {
                    code: 404,
                    messageText: 'Successful'
                }
            })
        }else {
            const response = return_error(404, 'Wrong number of pages');
            return res.status(400).json(response);
        }

    }catch(err) {
        return res.status(404).json({
            ok: false,
            message: {
                code: 404,
                messageText: err
            }
        })
    }
};

const get_libro = async (req, res) => {
    try {
    const book = await Book.find();
    res.render('lib', {
        data: book
    });
    console.log(book)
    }catch(err) {
        return res.status(404).json({
            ok: false,
            message: {
                code: 404,
                messageText: err
            }
        })
    }
};

const put_libro = async (req, res) => {
    try {
        
        const { id_book } = req.params;
        const book_Updated = await Book.findByIdAndUpdate(id_book, req.body);
        if (!book_Updated) {
            const response = return_error(404, 'book not exists');
            return res.status(404).json(response);
        }
        return res.status(200).json({
            ok: true,
            message: {
                code: 200,
                messageText: "updated book"
            }
        })
    }catch(err) {
        return res.status(404).json({
            ok: false,
            message: {
                code: 404,
                messageText: err
            }
        })
    } 
};

const delete_libro = async (req, res) => {
    try{

        const book = await Book.findByIdAndDelete(req.params.id_book);
        
        if (!book) {
            const response = return_error(404, 'book not exists');
            return res.status(404).json(response);
        }
        
        if(book.image?.public_id) {
            await deleteimage(book.image.public_id);
        }

        return res.status(200).json({
            ok: true,
            message: {
                code: 200,
                messageText: "deleted book"
            }
        })
    }catch(err) {
        return res.status(404).json({
            ok: false,
            message: {
                code: 404,
                messageText: err
            }
        })
    }
};

module.exports = {
    post_libro,
    get_libro,
    put_libro,
    delete_libro
}