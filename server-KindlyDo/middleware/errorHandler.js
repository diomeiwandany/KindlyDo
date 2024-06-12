function errorHandler(err, req, res, next) {
    console.log(err.name);
    switch (err.name) {
        // ERROR CODE 400 (SEQUELIZEVALIDATATIONERROR)
        case "SequelizeValidationError":
            return res.status(400).json({
                message: err.errors[0].message,
            });

        // ERROR CODE 404 (NOT FOUND)
        case "NotFound":
            return res.status(404).json({
                message: "Task not found",
            })

        // INTERNAL SERVER ERROR
        default:
            return res.status(500).json({
                message: "Internal Server Error",
            });
    }
}

module.exports = errorHandler;