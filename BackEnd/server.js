
require('./models/Ability');
require('./models/God');
require('./models/AbilityTranslated');
require('./models/GodTranslated');

const express = require("express");

const app = express();
const connectDB = require("./config/db");

app.use(express.json({limit: '50mb'}));

// Define Routers
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/smiteDev", require("./routes/api/smiteDev"));
app.use("/api/smiteTranslate", require("./routes/api/smiteTranslate"));


//Connect the DB (which is MongoDB btw);
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
