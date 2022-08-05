require('dotenv').config();
const crypto = require('crypto');


const decrypt = (text, callback) => {
    try{
        const enc_key = Buffer.from(process.env.PTO_APP_KEY, 'base64');
        const iv_key  = Buffer.from(process.env.PTO_APP_IV, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', enc_key, iv_key);
        let decrypted = decipher.update(text ,'base64','utf8');
        decrypted += decipher.final('utf8');
        callback(false, decrypted);
    } catch (e) {
        console.log(e.message);
        callback(e, null);
    }
}

module.exports = { decrypt }