const request = require('../utils/request.js');


/**
 * 登录
 */
const login = data => request('/login/login', data, 'POST');

module.exports = {
    login,
};

