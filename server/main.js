import app          from "#server/app.js";
import startServer  from "#server/server.js";
import dotenv       from 'dotenv'

dotenv.config()

function main()
{
    startServer(app);

}

main();