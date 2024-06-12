const { Task } = require('../models');

class Controller {
    static async taskList(req, res, next) {
        try {
            const data = await Task.findAll();
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        };
    };

    static async taskAdd(req, res, next) {
        try {
            const {
                name,
                description,
                assignerId,
                assigneeId,
                status,
            } = req.body;
            const data = await Task.create({
                name,
                description,
                assignerId,
                assigneeId,
                status,
            });

            return res.status(201).json({
                message: `Task ${data.name} has been created`,
            });
        } catch (error) {
            next(error);
        };
    };

    static async taskById(req, res, next) {
        try {
            const data = await Task.findByPk(req.params.id);
            if (!data) {
                throw { name: "NotFound" };
            };
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };

    static async taskUpdate(req, res, next) {
        try {
            const {
                name,
                description,
                assignerId,
                assigneeId,
                status,
            } = req.body;
            const data = await Task.findByPk(req.params.id);
            if (!data) {
                throw { name: "NotFound" };
            };
            await data.update({
                name,
                description,
                assignerId,
                assigneeId,
                status,
            });
            res.status(200).json({
                message: `Task with id ${data.id} - ${data.name} has been updated`,
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    static async taskDelete(req, res, next) {
        try {
            const data = await Task.findByPk(req.params.id);
            if (!data) {
                throw { name: "NotFound" };
            };
            await data.destroy();
            return res.status(200).json({
                message: `Task with id ${data.id} - ${data.name} has been deleted`,
            })
        } catch (error) {
            next(error);
        }
    }

};

module.exports = Controller;