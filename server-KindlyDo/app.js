if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const cors = require('cors');

const express = require('express');
const Controller = require('./controllers/controller');
const errorHandler = require('./middleware/errorHandler');
const authentication = require('./middleware/authentication');
const authorizationTask = require('./middleware/authorization');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/login', Controller.loginByGoogle);

app.use(authentication);
// AUTHENTICATION PAGES
app.get('/users', Controller.userList);
app.get('/', Controller.taskList);
app.get('/task/all', Controller.taskListAll);
app.get('/task/other', Controller.taskListOther);
app.post('/task/', Controller.taskAdd);
app.get('/task/:id', Controller.taskById);
app.put('/task/:id', authorizationTask, Controller.taskUpdate);
app.delete('/task/:id', authorizationTask, Controller.taskDelete);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});