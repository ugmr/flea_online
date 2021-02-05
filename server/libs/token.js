const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config');
const { CError, ERROR } = require('../libs/error');

const sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {expiresIn}, (err, token) => {
      console.log(err)
      if (err || !token) return reject(new CError(ERROR.SERVER_ERROR, 'token sign error'))
      resolve(token);
    });
  });
}

const verify = function (token) {
  return new Promise((resolve, reject) => {
    if(!token) resolve(false);
    const tk = token.replace('Bearer ', '');
    jwt.verify(tk, secret,(err, verified) => {
      if (err) return reject(new CError(ERROR.LOGIN_REQUIRED, 'Invalid token'));
      resolve(verified)
    });
  });
}

module.exports = {
  sign,
  verify,
  expiresIn
}