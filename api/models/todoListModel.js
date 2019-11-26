let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
	name: {
		type: String,
		required: 'Enter the name of the task'
	},
	priority:{
		type: String,
		default: 'Low'
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	timeToEnd:{
		type: Date,
		default: Date.now //TODO: Разобраться с date
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	}
});

module.exports = mongoose.model('Tasks', TaskSchema);