import "dotenv/config";

class Config 
{
    static get(key)
    {
        const config = {
            ENVIRONMENT : process.env.NODE_ENV,
            VERSION     : process.env.VERSION || "@2024",
            PORT        : process.env.PORT || 3000,

            DB_HOST     : process.env.DB_HOST,
            DB_NAME     : process.env.DB_NAME,
            DB_USER     : process.env.DB_USER,
            DB_PASS     : process.env.DB_PASS,
            DB_PORT     : process.env.DB_PORT,
            //DB_URL      : process.env.DB_URL,

            LOGS_MODE      : process.env.LOGS_MODE || "console",
            LOGS_FILE_PATH : process.env.LOGS_FILE_PATH || "logs",
        
            JWT_SECRET             : process.env.JWT_SECRET || "az_AZ",
            JWT_EXPIRES_IN_SECONDS : process.env.JWT_EXPIRES_IN_SECONDS || 600,

            GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID
        };
  
        return config[key] || null;
    }
}
  
export default Config;
