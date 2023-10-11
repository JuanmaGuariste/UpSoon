import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
	user: {
		type: String,
	},
	msj: {
		type: String,
	},
});

const chatModel = mongoose.model('messages', chatSchema);

export default chatModel;