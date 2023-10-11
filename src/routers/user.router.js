import { Router } from "express";
import passport from "passport";
import { uploadFile } from "../middleware/upload.middleware.js";
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import UsersController from "../controllers/users.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const userController = new UsersController();

const userRouter = Router();

userRouter.get('/', middlewarePassportJWT, isAdmin, userController.getUsers)

userRouter.delete('/', middlewarePassportJWT, isAdmin, userController.deleteUsers)

userRouter.delete('/:uid', middlewarePassportJWT, isAdmin, userController.deleteUser)

userRouter.post(
	'/',
	passport.authenticate('register', { failureRedirect: '/registerError' }),
	userController.home
	);

userRouter.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
	userController.github
);

userRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	userController.githubCallback
);

userRouter.post('/logout', middlewarePassportJWT, userController.logout);

userRouter.post('/login', userController.login);

userRouter.post('/premium/:uid', userController.premium);

userRouter.post('/:uid/rol/:rol', middlewarePassportJWT, isAdmin, userController.setUser);

userRouter.post('/:uid/documents',
	middlewarePassportJWT,
	uploadFile().fields([
		{ name: "identification", maxCount: 1 },
		{ name: "address", maxCount: 1 },
		{ name: "account", maxCount: 1 },
		{ name: "profile", maxCount: 1 },
		{ name: "products", maxCount: 1 },
	]),
	userController.uploadDocuments
	);

export default userRouter;