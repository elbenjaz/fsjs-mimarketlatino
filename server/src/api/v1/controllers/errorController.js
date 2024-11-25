
const error404 = async(req, res) => {
    let error = { error: "Resource not found" };
    res.locals.statusText = error;
    res.status(404).json(error);
};

export const errorController = { error404 };
