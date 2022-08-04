const router = require('express').Router();
const {login} = require('../../controller/AuthController')

router.get('/login', login);

module.exports = router