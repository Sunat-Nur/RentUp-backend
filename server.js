const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose").default;
const connectionString = process.env.MONGO_URL;
mongoose.set('strictQuery', false);


mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, goose) => {
        if (err) console.log("ERROR on connection MongoDB ");
        else {
            console.log("Mongodb connection success");
            const server = require("./app");
            let PORT = process.env.PORT || 3005;
            server.listen(PORT, function () {
                console.log(
                    `the server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
            });

        }
    }
);