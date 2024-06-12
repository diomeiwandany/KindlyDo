if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const cors = require('cors');

const express = require('express');
const Controller = require('./controllers/controller');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', Controller.taskList);
app.post('/task-add', Controller.taskAdd);
app.get('/task/:id', Controller.taskById);
app.put('/task/:id', Controller.taskUpdate);
app.delete('/task/:id', Controller.taskDelete);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});