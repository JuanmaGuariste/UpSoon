import CustomErrors from '../tools/CustomErrors.js';
import EErrors from '../tools/EErrors.js';
import { generateProductErrorInfo, generateIDErrorInfo } from '../tools/info.js';
import mongoose from 'mongoose';

class isValidProductDTO {
    title;
    description;
    category;
    price;
    thumbnail;
    code;
    stock;
    status;
    owner;
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.price = product.price;
        this.code = product.code;
        this.thumbnail = product.thumbnail;
        this.stock = product.stock;
        this.status = product.status;
        this.owner = product.owner;

        if (!this.title || !this.description || !this.category || !this.price || !this.code || !this.stock || !this.status || !this.owner) {
            throw CustomErrors.createError({
                name: "Product Creation Error",
                cause: generateProductErrorInfo(product),
                message: "Missing required fields",
                code: EErrors.INVALID_TYPE
            });
        }
    }
}


async function isValidProductIdDTO(pid) {
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            throw CustomErrors.createError({
                name: "Missing product ID",
                cause: generateIDErrorInfo(pid),
                message: "Missing required fields",
                code: EErrors.INVALID_TYPE
            });
        }
        return pid
}

export { isValidProductDTO, isValidProductIdDTO }