export default class UserDTO{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.img = user.img;
        this.rol = user.rol;
        this.cart = user.cart;
        this._id = user._id;
        this.password = user.password
        this.documents = user.documents
        this.last_connection = user.last_connection
        this.status = user.status
    }
}