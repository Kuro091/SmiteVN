const express = require("express");

const app = express();
const connectDB = require("./config/db");

//Connect the DB (which is MongoDB btw);
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routers
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/smiteDev", require("./routes/api/smiteDev"));
app.use("/api/smiteTranslate", require("./routes/api/smiteTranslate"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
