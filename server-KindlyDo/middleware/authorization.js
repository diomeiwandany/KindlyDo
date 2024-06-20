const { Task } = require('../models');

async function authorizationTask(req, res, next) {
    try {
        // console.log(req.user);
        const { id } = req.params;
        const { id: assigneeId } = req.user;
        // console.log(assigneeId);
        const data = await Task.findByPk(id);
        // console.log(data);

        if (assigneeId === data.assigneeId) {
            next();
        } else {
            throw { name: "Forbidden" };
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authorizationTask;