// bcript
import bcript from "bcryptjs";

// model
import { userModel } from '../models/userModel.js';

const login = async(req, res) => {
    let error;

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Required parameters are missing.");
        }
    
        const user = await userModel.getUser({ email });

        if (!user) {
            //We don't give back a cause in the feedback to avoid giving an attacker details
            //error = { error: "User not found" };
            error = { error: "Email and/or password is invalid" };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }
      
        const passwordMatch = bcript.compareSync(password, user.password);

        if (!passwordMatch) {
            //We don't give back a cause in the feedback to avoid giving an attacker details
            //error = { error: "Password is incorrect" };
            error = { error: "Email and/or password is invalid" };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        const token = userModel.createToken(user);

        res.locals.statusText = token;
        return res.status(200).json(token);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

const loginWithGoogle = async(req, res) => {
    let error;

    try {
        const { sub, email, given_name, family_name, picture } = req.auth;

        if (!sub) {
            throw new Error("Required parameters are missing.");
        }
    
        let user = await userModel.getUser({ id_user_google : sub });

        if (!user) {
            //register
            const userExists = await userModel.getUser({ email });

            if (userExists) {
                error = { error: "User already exists" };
                res.locals.statusText = error;
                return res.status(409).json(error);
            }
    
            user = await userModel.createUser({
                firstname      : given_name,
                lastname       : family_name,
                email          : email,
                password_raw   : "-",
                avatar_url     : picture,
                id_user_google : sub
            });
        }

        const token = userModel.createToken(user);

        res.locals.statusText = token;
        return res.status(200).json(token);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const loginController = { login, loginWithGoogle };
