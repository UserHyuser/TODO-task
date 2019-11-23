var express = require('express');
var router = express.Router();
let Task = require('../api/models/todoListModel'); // Сначала регистрируем модель
let todoList = require('../api/controllers/todoListController.js'); // Потом к ней обращаемся

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next) {
  todoList.listAllTasks(req,res);
});
router.post('/tasks', function(req, res, next) {
  todoList.createTask(req,res);
});

router.get('/tasks/:taskId', function(req, res, next) {
  todoList.readTask(req,res);
});
router.post('/tasks/:taskId', function(req, res, next) {
  todoList.updateTask(req,res);
});
router.get('/tasks/:taskId/remove', function(req, res, next) {
  todoList.delete(req,res);
});

module.exports = router;
