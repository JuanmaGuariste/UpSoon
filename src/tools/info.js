export const generateUserErrorInfo = (user) => {
    return `
    Error con el usuario
    Email > ${user.email} 
    Password > ${user.password}`
}

export const generateProductErrorInfo = (product) => {
	return `\n\nProduct Creation Error: One or more properties were incomplete or not valid. List of required properties:\n
    *tittle      : needs to be string, received: ${product.title}\n 
    *description : needs to be string, received: ${product.description}\n 
    *code        : needs to be string, received: ${product.code}\n
    *price       : needs to be number, received: ${product.price}\n
    *status      : needs to be boolean, received: ${product.status}\n
    *stock       : needs to be number, received: ${product.stock}\n
    *category    : needs to be string, received: ${product.category}\n
    *thumbnail   : needs to be array, received: ${product.thumbnail}\n\n
    ----------------------------------------------------------------------------------------------------------------------\n`;
};
export const generateIDErrorInfo = (id) => {
	return `\n\nMissing product ID\n 
    *ID: needs to be mongo ID, received: ${id}\n
    ----------------------------------------------------------------------------------------------------------------------\n`;
};