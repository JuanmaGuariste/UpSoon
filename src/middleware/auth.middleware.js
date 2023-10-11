export function isAuth(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

export function isGuest(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
}
export function isUser(req, res, next) {
	if ((req.user.rol === 'user')) {
		next();
	} else {
		res.redirect('/');
	}
}
export function isAdminOrPremium(req, res, next) {	
	if ((req.user.rol === 'admin' ||req.user.rol === 'premium')) {
		next();
	} else {
		res.redirect('/');
	}
}
export function isAdmin(req, res, next) {	
	if ((req.user.rol === 'admin')) {
		next();
	} else {
		res.redirect('/');
	}
}