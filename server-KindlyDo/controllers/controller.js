const { Op } = require('sequelize');
const { Task, User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { signToken } = require('../helpers/jwt');
const client = new OAuth2Client();

class Controller {
    static async loginByGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENTID,
            });
            // console.log(ticket);
            // console.log(ticket.getPayload());
            const payload = ticket.getPayload();
            // console.log(payload);
            const [user] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                }
            });
            console.log(user);
            const token = signToken({
                id: user.dataValues.id,
            });
            // console.log(user[0].dataValues.id);

            return res.status(201).json({
                access_token: token,
            });
            // res.send('LOGIN VIA GOOGLE JALAN GAES');
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async taskList(req, res, next) {
        try {
            // console.log(req.user);
            const { id } = req.user;
            const data = await Task.findAll({
                where: {
                    assigneeId: id,
                },
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: User,
                        as: 'assigner',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'assignee',
                        attributes: ['id', 'name']
                    }
                ]
            });
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        };
    };

    static async taskListAll(req, res, next) {
        try {
            // console.log(req.user);
            const data = await Task.findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: User,
                        as: 'assigner',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'assignee',
                        attributes: ['id', 'name']
                    }
                ]
            });
            // console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        };
    };

    static async taskListOther(req, res, next) {
        try {
            const { id } = req.user;
            // console.log(req.user);
            const data = await Task.findAll({
                order: [
                    ['id', 'DESC']
                ],
                where: {
                    [Op.not]: [
                        { assigneeId: id }
                    ]
                },
                include: [
                    {
                        model: User,
                        as: 'assigner',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'assignee',
                        attributes: ['id', 'name']
                    }
                ]
            });
            // console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            });
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

            if (data.status === "Done") {
                await data.destroy();
            } else {
                throw { name: "NotDone" };
            };

            return res.status(200).json({
                message: `Task with id ${data.id} - ${data.name} has been deleted`,
            });
        } catch (error) {
            next(error);
        }
    };

    static async userList(req, res, next) {
        try {
            const data = await User.findAll({
                order: [
                    ['id', 'ASC']
                ],
                attributes:
                    ['id', 'name', 'email']
            });

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

};

module.exports = Controller;