const jwt = require('jsonwebtoken');
var randtoken = require('rand-token');

module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      // const token = req.headers.authorization.split(' ')[1];
      const token = randtoken.generate(20);
      const decoded = jwt.verify(token, 'SECRETKEY');
      req.userData = decoded;
      next();
    } catch (err) {
      return res
        .status(401)
        .send(
          '<h1>This is the secret content. Only logged in users can see that!</h1>'
        );
    }
  },
};
