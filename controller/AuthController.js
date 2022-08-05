const jwt = require('jsonwebtoken');
const storage = require('node-sessionstorage');

const login = (req, res) => {
    try {
        const token = jwt.sign({user: req.user}, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        storage.setItem('username', req.username);
        res.cookie(
            'user',
            JSON.stringify({
                user: req.user,
                accessToken: token,
                statusCode: 201,
            }),
            {maxAge: 3600000},
        );

        res.status(201).json({
            user: req.user,
            accessToken: `Bearer ${token}`,
            statusCode: 201,
        })
    } catch (e) {
        res.status(505).json({
            error: e.message,
            statusCode: 505
        })
    }

}

module.exports = {
    login
}