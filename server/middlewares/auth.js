import Config from "../src/api/v1/utils/Config.js";

import { OAuth2Client } from 'google-auth-library';

// jwt
import jwt from "jsonwebtoken";

const checkAuthentication = (req, res, next) => {
    let error;

    try {
        //validate headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            error = { error: "Token is required" };
            res.locals.statusText = error;
            return res.status(401).json(error);
        }

        //validate token
        req.auth = jwt.verify(token, Config.get("JWT_SECRET"));
        next();
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

const checkGoogleAuthentication = async(req, res, next) => {
    let error;

    try {
        //validate headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            error = { error: "Token is required" };
            res.locals.statusText = error;
            return res.status(401).json(error);
        }

        //validate token
        const client = new OAuth2Client(Config.get("GOOGLE_CLIENT_ID"));

        const ticket = await client.verifyIdToken({
            idToken  : token,
            audience : Config.get("GOOGLE_CLIENT_ID")
        });

        req.auth = ticket.getPayload();
        next();
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const auth = { checkAuthentication, checkGoogleAuthentication };
