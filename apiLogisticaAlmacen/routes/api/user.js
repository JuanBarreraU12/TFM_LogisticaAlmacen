const { getAll } = require('../../models/user.model');

const router = require('express').Router;


router.get('/', (req, res) => {
    getAll()
        .then(user => {
            res.json(user);
        })
        .catch((error) => {
            res.json({ fatal: error.message });
        }); 
})

