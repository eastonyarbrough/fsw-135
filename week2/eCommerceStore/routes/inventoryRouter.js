const express = require('express');
const inventoryRouter = express.Router();
const Part = require('../models/part.js');

inventoryRouter
    .get('/', (req, res, next) => {
        Part.find((err, parts) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(parts);
        });
    }) //GET all

    .get('/:inventoryID', (req, res, next) => {
        Part.find({_id: req.params.inventoryID}, (err, part) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            if (part.length === 0) {
                const error = new Error('Sorry, the requested item was not found');
                return next(error);
            }
            else if (part.length !== 0) {
                res.status(200).send(part);
            }
        });
    }) //GET one

    .get('/search/dept', (req, res, next) => {
        const userQuery = req.query.dept;
        const compQuery = userQuery.toLowerCase().replace(' ', '');

        Part.find((err, allData) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            const filtered = allData.filter(e => e.dept.toLowerCase().replace(' ', '').includes(compQuery));

            if (filtered.length === 0) {
                const error = new Error('Department Not Found (Options: Power, Motherboards, Storage, Memory, Processors, Graphics, Coolers, Cases)');
                res.status(404);
                return next(error);
            }
            else if (filtered.length !== 0) {
                res.status(200).send(filtered);
            }
        });
    }) //GET query department

    .get('/search/form', (req, res, next) => {
        const userQuery = req.query.form;
        const compQuery = userQuery.toLowerCase().replace(' ', '');

        Part.find((err, allData) => {
            if (err) {
                res.status(500);
                return next(err)
            }

            const filtered = allData.filter(e => e.form.toLowerCase().replace(' ', '').includes(compQuery));

            if (filtered.length === 0) {
                const error = new Error('Sorry, we do not have that form factor in stock');
                res.status(404);
                return next(error);
            }
            else if (filtered.length !== 0) {
                res.status(200).send(filtered);
            }
        });
    }) //GET query form-factor

    .get('/search/brand', (req, res, next) => {
        const userQuery = req.query.brand;
        const compQuery = userQuery.toLowerCase().replace(' ', '');

        Part.find((err, allData) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            const filtered = allData.filter(e => e.brand.toLowerCase().replace(' ', '').includes(compQuery));

            if (filtered.length === 0) {
                const error = new Error(`Sorry, we do not have ${userQuery} in stock`);
                res.status(404);
                return next(error);
            }
            else if (filtered.length !== 0) {
                res.status(200).send(filtered);
            }
        });
    }) //GET query brand

    .post('/', (req, res, next) => {
        const newEntry = new Part(req.body);
        newEntry.save((err, newPart) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(201).send(newPart);
        });
    }) //POST one

    .put('/:inventoryID', (req, res, next) => {
        Part.findOneAndUpdate({_id: req.params.inventoryID}, req.body, {new: true}, (err, updatePart) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(201).send(updatePart);
        })
    }) //PUT one

    .delete('/:inventoryID', (req, res, next) => {
        Part.findOneAndDelete({_id: req.params.inventoryID}, (err, deletedPart) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(`Successfully removed ${deletedPart.part} from the database`);
        });
    }) //DELETE one

module.exports = inventoryRouter;