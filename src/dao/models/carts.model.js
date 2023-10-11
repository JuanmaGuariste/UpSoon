import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
	products: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
				cant: Number,
			},
		],
		default: [],
	},
});

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;