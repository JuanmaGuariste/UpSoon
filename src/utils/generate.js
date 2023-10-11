import { faker } from '@faker-js/faker';

export function generateProducts() {
    const numberOfProducts = 100;
    let products = [];
    for(let i = 0; i < numberOfProducts; i++){
        products.push({
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),            
            price: faker.commerce.price(),
            thumbnail: faker.image.avatar(),
            code: faker.database.mongodbObjectId(),
            stock: faker.number.int({ min: 0, max: 500 }),
            status: "true",
            __v: 0,
            id: faker.database.mongodbObjectId(),
        })
    }
    return products    
}