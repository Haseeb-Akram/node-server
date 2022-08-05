const express = require('express');

const app = express();

const router = express.Router()
const { login } = require('../../controller/AuthController');
const { loginMiddleware } = require('../../middleware/AuthMiddleware')

router.get('/login', loginMiddleware ,login);

module.exports = router