const connectAD = require('../config/ActiveDirectory');


const findUser = (username, callback) => {
    connectAD.findUser(username, function(err, user) {
        if (err) {
            callback(err, null);
        }

        if (! user) {
            callback(null, null);
        }
        else {
            callback(false, user);
        }
    });
}

module.exports = { findUser }