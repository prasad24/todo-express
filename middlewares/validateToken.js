import * as utils from '../lib/utils';
import * as responseStatus from '../lib/responseStatus';

const validateToken = (req, res, next) => {
    console.log(req.url);
    if((req.url.indexOf("/user") > 0) &&
        req.method === "POST") {
        //allow this route: POST /user (creation of new user - Only route allowed without authentication)
        next();
    } else if(req.headers["auth_token"]) {
        const token = req.headers["auth_token"];
        //check if auth_token is valid.
        const user = utils.verifyToken(token);
        if(!user && !user.email) {
            return responseStatus.sendError(res, 'Invalid Auth Token');
        }
        next();
    } else {
        return responseStatus.sendError(res, 'Invalid Auth Token');
    }
}

export default validateToken;