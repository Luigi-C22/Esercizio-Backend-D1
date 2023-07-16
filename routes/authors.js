const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const AuthorModel = require('../models/AuthorModel');

router.get('/authors', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        res.status(200).send({
            statusCode: 200,
            authors,
        })
    }catch (error) {
        res.status(500).send({error: 'Error, id not found'});
    }
});

router.get('/authors/:id', async (req, res) => {
    const {id} = req.params;
    const authorExist = await AuthorModel.findById(id);
    if(!authorExist) {
        res.status(404).send({error: `author with id ${id} not found`})
    }

    try {const authorById = await AuthorModel.findById(id);
    res.status(200).send({
        statusCode: 200,
        authors
    })
    } catch (error) {
        res.status(500).send({error: 'Internal server error'}) 
    }

}) 

router.post('/authors', async (req, res) => {
    const newAuthor = new AuthorModel({
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        avatar: req.body.avatar

    });
    try {
        const author = await newAuthor.save()

        res.status(201).send({
            ststusCode: 201,
            author,
            message: 'author creato con successo'
        })
    }catch (error)  {
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.put('/authors/:id', async (req, res) => {
    const {id} = req.params;

    const authorExist = await AuthorModel.findById();
    if(!authorExist) {
        res.status(404).send({error: ` author with id ${id} not found`})
    }
    const Author = new AuthorModel({
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        avatar: req.body.avatar

})

try {
    const authId = id
    const authorPutted = await AuthorModel.findByIdAndUpdate(authId, AuthorModel, )
    const authorFinal = {new: true}

    res.status(200).send({
        statusCode: 200,
        message: `Author with id ${authId} modify successfully`,
        authorPutted

    })
} catch (error) {
    res.status(500).send({
        statusCode: 500,
        message: 'Internal server error'
    })
}
});

author.delete('/authors/:id', async (req, res) => {
    const {id} = req.params;

    try { 
        const authorExist = await AuthorModel.findById(id);

        if (!authorExist) {
            return res.status(404).send({
                statusCode: 404,
                message: `Author with id ${id} doesn't exist!`,
            });
        }
        const authorToDelete = await AuthorModel.findByIdAndDelete(id);

        res.status(200).send({
            stausCode: 200,
            message: `Author with id ${id} deleted successfully`,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    }
});


module.exports = router; 