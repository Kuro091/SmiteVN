const app =  require('express');
const connectDB = require('./config/db');

//Connect the DB (which is MongoDB btw);
connectDB();

// Init Middleware
app.use(express.json({extended: false }));

// Define Routers
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));