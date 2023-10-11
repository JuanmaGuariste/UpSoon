export default class ReducedUserDTO {
    constructor(user) {
        this.first_name = user.first_name || ''; 
        this.last_name = user.last_name || ''; 
        this.email = user.email || ''; 
        this.rol = user.rol || ''; 
        this.last_connection = user.last_connection || '';
        this._id = user._id || '';
    }
}
