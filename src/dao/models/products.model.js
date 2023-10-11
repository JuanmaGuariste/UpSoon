import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
		index: true,
	},
	price: {
		type: Number,
		required: true,
	},
	thumbnail: {
		type: String,
		required: false,
	},
	code: {
		type: String,
		unique: true,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},	
	status: {
		type: Boolean,
		required: true,
		index: true,
	},
	owner: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            }
        ],
    }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model('products', productSchema);

export default productModel;