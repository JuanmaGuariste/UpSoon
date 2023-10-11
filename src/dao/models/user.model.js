import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    age: Number,
    password: String,
    img: String,
    rol: {
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user",
    },
    cart: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts",
            }
        ],
        default: "",
    },
    documents: {
        type: [
            {
                name: String,
                reference: String
            }
        ],
        default: [],
    },
    last_connection: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;