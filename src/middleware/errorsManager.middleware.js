import EErrors from "../tools/EErrors.js";

export function errorsManagerMiddleware(err, req, res, next) {
	
	req.logger.error(`\n
	Date: ${new Date().toISOString()}\n
	Method: ${req.method}\n
	URL: ${req.url}\n
	IP: [${req.ip}]\n
	User: ${req.get('user-agent')}\n
	Error information: ${err}`);

    switch (err.code) {
		case EErrors.ROUTING_ERROR:
			res.status(400).send({ status: 'error', error: err.name });
			break;
		case EErrors.INVALID_TYPE:
			res.status(400).send({ status: 'error', error: err.name });
			break;
		case EErrors.DATABASE_ERROR:
			res.status(400).send({ status: 'error', error: err.name });
			break;
		default:
			res.status(400).send({ status: 'error', err: 'Error sin especificar' });
			break;
	} 
}

