function errorHandler(err, req, res, next) {
    console.log(err.name);
    switch (err.name) {
        // ERROR CODE 400 (SEQUELIZEVALIDATATIONERROR)
        case "SequelizeValidationError":
            return res.status(400).json({
                message: err.errors[0].message,
            });

        // ERROR CODE 401 (UNAUTHORIZED)
        case "InvalidToken":
            return res.status(401).json({
                message: `Invalid Token`,
            });

        // ERROR CODE 403 (FORBIDDEN)
        case "NotDone":
            return res.status(403).json({
                message: `Only task status Done can be deleted`,
            });

        case "Forbidden":
            return res.status(403).json({
                message: `Forbidden`
            });

        // ERROR CODE 404 (NOT FOUND)
        case "NotFound":
            return res.status(404).json({
                message: "Task not found",
            });

        case "UserNotFound":
            return res.status(404).json({
                message: "User not found",
            });

        // ERROR CODE 500 (INTERNAL SERVER ERROR)
        case "SequelizeConnectionRefusedError":
            return res.status(500).json({
                message: "Internal Server Error",
            })
        default:
            return res.status(500).json({
                message: "Internal Server Error",
            });
    }
}

module.exports = errorHandler;