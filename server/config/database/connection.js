import Config from "../../src/api/v1/utils/Config.js";
import pg from "pg";

const pool = new pg.Pool({
    host             : Config.get("DB_HOST"),
    database         : Config.get("DB_NAME"),
    user             : Config.get("DB_USER"),
    password         : Config.get("DB_PASS"),
    port             : Config.get("DB_PORT"),
    //connectionString : Config.get("DB_URL"),
    allowExitOnIdle  : true,
});

async function connectToDatabase() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

connectToDatabase();

export default pool;
