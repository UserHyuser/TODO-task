let mongoose = require('mongoose');
let Task = mongoose.model('Tasks');

exports.listAllTasks = async function (req, res) {
	const tasks = await Task.find({});
	res.json(tasks)
};

exports.createTask = function(req, res) { // Коллбеки у асинхронных функций
	let new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err) res.send(err);
		res.json({ message: 'Task was successfully created' });
	});
};

exports.readTask = function(req, res) {
	Task.findById(req.params.taskId, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};


exports.updateTask = function(req, res) {
	Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
		if (err) res.send(err);
		res.json({ message: 'Task was successfully updated' });
	});
};

exports.deleteTask = function(req, res) {
	Task.remove({
		_id: req.params.taskId
	}, function(err, task) {
		if (err) res.send(err);
		res.json({ message: 'Task was successfully deleted' });
	});
};
