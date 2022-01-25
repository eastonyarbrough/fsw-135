const express = require('express');
const inventoryRouter = express.Router();
const {v4: uuid} = require('uuid');

let data = [
    {
        part: "750w Power Supply",
        brand: "Signature",
        form: "Modular",
        dept: "Power",
        ppu: 68.98,
        _id: uuid()
    },
    {
        part: "Extreme 4 ATX Motherboard",
        brand: "ASRock",
        form: "LGA 1151",
        dept: "Motherboards",
        ppu: 189.56,
        _id: uuid()
    },
    {
        part: "1TB SSD",
        brand: "Western Digital",
        form: "SATA",
        dept: "Storage",
        ppu: 86.99,
        _id: uuid()
    },
    {
        part: "2x 4GB RAM",
        brand: "Crucial Ballistix",
        form: "DDR4",
        dept: "Memory",
        ppu: 60.89,
        _id: uuid()
    },
    {
        part: "i7 8-core 3.8ghz CPU",
        brand: "Intel",
        form: "LGA 1151",
        dept: "Processors",
        ppu: 289.75,
        _id: uuid()
    },
    {
        part: "RX 580 8GB GPU",
        brand: "AMD / XFX",
        form: "GDDR5",
        dept: "Graphics",
        ppu: 779.99,
        _id: uuid()
    },
    {
        part: "Dual Fan Heatsink",
        brand: "Cooler Master",
        form: "LGA 1151, LGA 1200, AM3/AM3+, AM4",
        dept: "Coolers",
        ppu: 52.68,
        _id: uuid()
    },
    {
        part: "Black Mesh Computer Case",
        brand: "DIYPC",
        form: "Micro ATX",
        dept: "Cases",
        ppu: 54.89,
        _id: uuid()
    },
    {
        part: "600w Power Supply",
        brand: "EVGA",
        form: "Modular",
        dept: "Power",
        ppu: 52.67,
        _id: uuid()
    },
    {
        part: "B550 ATX Motherboard",
        brand: "MSI",
        form: "AM4",
        dept: "Motherboards",
        ppu: 140.99,
        _id: uuid()
    },
    {
        part: "2TB HDD",
        brand: "Hitachi",
        form: "SATA",
        dept: "Storage",
        ppu: 58.64,
        _id: uuid()
    },
    {
        part: "2x 8GB RAM",
        brand: "Corsair",
        form: "DDR4",
        dept: "Memory",
        ppu: 87.99,
        _id: uuid()
    },
    {
        part: "Ryzen 7 8-Core 4.0ghz",
        brand: "AMD",
        form: "AM4",
        dept: "Processors",
        ppu: 347.82,
        _id: uuid()
    },
    {
        part: "GTX 1080ti 11GB GPU",
        brand: "NVIDIA / MSI",
        form: "GDDR5",
        dept: "Graphics",
        ppu: 1049.97,
        _id: uuid()
    },
    {
        part: "Dual Radiator AIO Heatsink",
        brand: "ASUS ROG",
        form: "LGA 1151, LGA 1200, AM3/AM3+, AM4",
        dept: "Coolers",
        ppu: 159.99,
        _id: uuid()
    },
    {
        part: "White Airflow Computer Case",
        brand: "Corsair",
        form: "Mid ATX",
        dept: "Cases",
        ppu: 89.76,
        _id: uuid()
    }
]

inventoryRouter
    .get('/', (req, res) => {
        res.status(200).send(data);
    }) //GET all

    .get('/:inventoryID', (req, res, next) => {
        const itemID = req.params.inventoryID;
        const foundItem = data.filter(e => e._id == itemID);

        if (foundItem.length === 0) {
            const error = new Error('Sorry, the requested item was not found');
            return next(error);
        }

        res.status(200).send(foundItem);
    }) //GET one

    .get('/search/dept', (req, res, next) => {
        const userQuery = req.query.dept;
        const filtered = data.filter(e => e.dept.toLowerCase() == userQuery.toLowerCase());

        if (filtered.length === 0) {
            const error = new Error('Department Not Found (Options: Power, Motherboards, Storage, Memory, Processors, Graphics, Coolers, Cases)');
            return next(error);
        }

        res.status(200).send(filtered);
    }) //GET query department

    .get('/search/form', (req, res, next) => {
        const userQuery = req.query.form;
        const filtered = data.filter(e => e.form.toLowerCase().replace(' ', '').includes(userQuery.toLowerCase().replace(' ', '')));

        if (filtered.length === 0) {
            const error = new Error('Sorry, we do not have that form factor in stock');
            return next(error);
        }

        res.status(200).send(filtered);
    }) //GET query form-factor

    .get('/search/brand', (req, res, next) => {
        const userQuery = req.query.brand;
        const filtered = data.filter(e => e.brand.toLowerCase().replace(' ', '').includes(userQuery.toLowerCase().replace(' ', '')));

        if (filtered.length === 0) {
            const error = new Error('Sorry, we do not have that brand in stock');
            return next(error);
        }

        res.status(200).send(filtered);
    }) //GET query brand

    .post('/', (req, res, next) => {
        const newEntry = req.body;
        
        if (!newEntry.part || !newEntry.brand || !newEntry.form || !newEntry.dept || !newEntry.ppu) {
            const error = new Error('Please enter the proper information (Required: part, brand, form, dept, ppu)');
            return next(error)
        }
        
        newEntry._id = uuid();
        data.push(newEntry);
        res.status(201).send(`${newEntry.part} has been successfully added to the database`);
    }) //POST one

    .put('/:inventoryID', (req, res, next) => {
        const itemID = req.params.inventoryID;
        const itemIndex = data.findIndex(e => e._id == itemID);

        if (itemIndex === -1) {
            const error = new Error('Sorry, the requested item was not found');
            return next(error)
        }

        Object.assign(data[itemIndex], req.body);
        res.status(201).send(`${data[itemIndex].part} has been successfully updated`)
    }) //PUT one

    .delete('/:inventoryID', (req, res, next) => {
        const itemID = req.params.inventoryID;
        const itemIndex = data.findIndex(e => e._id == itemID);

        if (itemIndex === -1) {
            const error = new Error('Sorry, the requested item was not found');
            return next(error)
        }

        data.splice(itemIndex, 1);
        res.status(200).send(`Item ${itemID} has been successfully removed from the database`);
    }) //DELETE one

module.exports = inventoryRouter;