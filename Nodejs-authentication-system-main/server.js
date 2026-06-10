require("dotenv").config();

let app = require('./app');

const PORT = process.env.PORT_NUM || 3001;

require("./config/db.js");

app.listen(PORT, () => {
    console.log(`app is started at ${PORT}`);
});