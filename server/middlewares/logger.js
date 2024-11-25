import Config from "../src/api/v1/utils/Config.js";
import fs from "fs";

const datetime_utc = new Date().toISOString().slice(0, 19).replace('T', ' ');

const options = {
    mode       : Config.get("LOGS_MODE"),
    fileFolder : Config.get("LOGS_FILE_PATH"),
    fileName   : `${datetime_utc.slice(0, 10)}.log`
};

const logger = (req, res, next) => {
    const start = Date.now();

    let requestText = `\n\n[Request] -->\n${req.connection.remoteAddress} - [${datetime_utc} UTC] "${req.method} ${req.url}"`;

    if (typeof req.headers === 'object' && Object.keys(req.headers).length) {
        //requestText+= `\nHeaders:\n${JSON.stringify(req.headers, null, "    ")}`;
    }

    if (typeof req.body === 'object' && Object.keys(req.body).length) {
        requestText+= `\nBody:\n${JSON.stringify(req.body, null, "    ")}`;
    }

    const log = (text) => {
        switch(options.mode) {
            case "console":
                logConsole(text);
                break;
    
            case "file":
                logFile(text, options);
                break;
        }    
    };

    log(requestText);

    res.on("finish", async () => {
        if (typeof req.auth === 'object' && Object.keys(req.auth).length) {
            let requestAuth = `\nAuth:\n${JSON.stringify(req.auth, null, "    ")}`;
            log(requestAuth);
        }
    
        let responseText = `\n<-- [Response]\n"${res.statusCode} ${res.statusMessage}" in ${((Date.now() - start)/1000).toFixed(3)} secs.\n${JSON.stringify(res.locals.statusText, null, "    ")}`;
        log(responseText);
    });

    next();
};

const logConsole = (text) => {
    process.stdout.write(text);
};

const logFile = (text, {fileFolder, fileName}) => {
    if (!fs.existsSync(fileFolder)) {
        fs.mkdirSync(fileFolder);
    }

    fs.appendFile(`${fileFolder}/${fileName}`, text, (err) => {
        if (err) {
            console.error('Error logger:', err);
        }
    });
}

export default logger;
