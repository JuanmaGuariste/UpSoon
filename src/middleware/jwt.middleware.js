import passport from "passport";
import jwt from "jsonwebtoken";
import usersService from "../services/users.service.js";

const privateKey = 'privatekey';

const authToken = (req, res, next) => {
    const authHeader = req.cookies.token;
    if (!authHeader){
        return res.status(401).send({message: "Token not found"});
    }

    const token = authHeader.split(" ")[1];    
    jwt.verify(token, privateKey, (err, credentials) => {
        if (err){
            return res.status(401).send({message: "Token invalid"});
        }
        req.user = credentials.user;
        next();
    })
} 

const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, usr, info) => {        
		if (err) {
			next(err);
		}
		if (!usr) {
			return res.redirect('/login');
		}
		req.user = await usersService.getUserById(usr); 
		next();
	})(req, res, next);
};

export {middlewarePassportJWT, authToken};