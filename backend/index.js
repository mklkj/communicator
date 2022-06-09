const express = require("express");
const app = express();

const usersRoute = require("./routes/users");
const socketRoute = require("./routes/socket");

const PORT = 3005;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", false);
	next();
});

app.use("/", usersRoute);
app.use("/", socketRoute);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
