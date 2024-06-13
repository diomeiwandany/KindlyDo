const { verifyToken } = require("../helpers/jwt");

function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;
        // console.log(access_token);
        if (!access_token) {
            throw { name: "Forbidden" };
        };

        const [type, token] = access_token.split(" ");
        if (type !== "Bearer" || !access_token) {
            throw { name: "InvalidToken" };
        };

        const { id } = verifyToken(token);
        req.user = { id };
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;