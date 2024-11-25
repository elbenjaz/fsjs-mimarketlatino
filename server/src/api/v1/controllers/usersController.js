// model
import { userModel } from '../models/userModel.js';

// method: POST
const createUser = async(req, res) => {
    let error;

    try {
        const { email } = req.body;
        const userExists = await userModel.getUser({ email });

        if (userExists) {
            error = { error: "User already exists" };
            res.locals.statusText = error;
            return res.status(409).json(error);
        }

        const user = await userModel.createUser(req.body);

        //remove sensible data
        delete(user.password);

        res.locals.statusText = user;
        return res.status(201).json(user);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: GET
const getUser = async(req, res) => {
    let error;

    try {
        const { id_user } = req.auth;

        const user = await userModel.getUser({ id_user });

        if (!user || (Number(user.id_user) !== Number(req.params.id_user))) {
            error = { error: "User does not exist or invalid privileges." };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        //remove sensible data
        delete(user.password);

        res.locals.statusText = user;
        return res.status(200).json(user);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: PUT
const editUser = async(req, res) => {
    let error;

    try {
        const { id_user } = req.auth;
        const { email } = req.body;

        const user = await userModel.getUser({ id_user });

        if (!user || (Number(user.id_user) !== Number(req.params.id_user))) {
            error = { error: "User does not exist or invalid privileges." };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }
        
        if (email && await userModel.getUser({ email, id_user_diff : id_user })) {
            error = { error: "Email is already in use." };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        const editUser = await userModel.editUser({...req.body, id_user, date_upd: "CURRENT_TIMESTAMP" });

        if (!editUser) {
            error = { error: `User could not be updated.` };
            res.locals.statusText = error;
            return res.status(500).json(error);
        }

        //remove sensible data
        delete(editUser.password);

        res.locals.statusText = editUser;
        return res.status(200).json(editUser);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const usersController = { getUser, createUser, editUser };
