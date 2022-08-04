const { findUserByUsername } = require('../services/AuthService')

const login = (req, res) => {
    const {username, password} = req.body
    // request validate

    //db
    const user = findUserByUsername()
    if (user.password === passwor) {}
    return res.json({message: "Logged In"})
}

module.exports = {
    login
}