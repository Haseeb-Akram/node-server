const connectAD = require('../config/ActiveDirectory');
const { decrypt } = require('../helpers/encryption');
const ntlm = require('express-ntlm');
const { findUser } = require('../helpers/activedirectory');
const {auth} = require("node-expose-sspi/dist/sso/auth");
require('dotenv').config();



const loginMiddleware = (req, res, next) => {
    try{
        if(!req.query.username) {
            const { username, password } = req.body;
            // connectAD.authenticate(username, password, (err,auth) => {
            //     if(err) {
            //         throw new Error(err);
            //     }
            //     if(!auth) {
            //         res.status(401).json({
            //             error: "You are not Authorized User",
            //             statusCode: 401
            //         });
            //     }
                findUser(username, (err, user) => {
                    req.user = user;
                    req.username = username;
                    next();
                });
            // });
        } else {
            decrypt(req.query.username, (err, username) => {
                if(err) {
                    res.status(505).json({
                        error: err,
                        statusCode: 505
                    });
                }
                findUser(username, function(err, user) {
                    if (err) {
                        res.status(505).json({
                            error: err,
                            statusCode: 505
                        });
                    }
                    if (! user) {
                        res.status(401).json({
                            error: "You are not Authorized User",
                            statusCode: 401
                        });
                    }
                    else {
                        req.user = user;
                        req.username = username;
                        next();
                    }
                });
            });
        }
    }catch (err) {
        res.status(505).json({
            error: err.message,
            statusCode: 505
        })
    }
}


module.exports = { loginMiddleware }
