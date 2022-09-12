require('dotenv').config();

const { DB_URL, HOST } = process.env;
const PORT = process.env.PORT || 5000;


const mongoose = require('mongoose');
const app = require('./app');
const path = require("path")

app.use(app.static(path.join(__dirname, "client", "build")))


// Mongo Connect
mongoose
.connect(DB_URL)
.then(() => {
  console.log('hello connected');
})
.catch(() => {
  console.log('nooooooooooo');
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Server Listen
app.listen(PORT, HOST, () => {
  console.log('server is running');
});
