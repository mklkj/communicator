const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Emitter } = require("@socket.io/mongo-emitter");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");
const cors = require("cors");

app.use(cors({ origin: "*" }));

const mongoClient = new MongoClient(
	"mongodb+srv://inzynieria:VhcL1kCXn4e4vs1W@cluster0.p7kp2wp.mongodb.net/?retryWrites=true&w=majority",
	{
		useUnifiedTopology: true,
	}
);

const main = async () => {
	await mongoClient.connect();

	const mongoCollection = mongoClient
		.db("crud-quotes")
		.collection("socket.io-adapter-events");
	const emitter = new Emitter(mongoCollection);

	// setInterval(() => {
	// 	emitter.emit("ping", new Date());
	// }, 1000);
	try {
		await mongoClient
			.db("crud-quotes")
			.createCollection("socket.io-adapter-events", {
				capped: true,
				size: 1e6,
			});
	} catch (e) {
		// collection already exists
	}

	io.adapter(createAdapter(mongoCollection));
	io.listen(3001);

	io.on("send_message", (data) => {
		console.log(data);
		io.broadcast.emit("receive_message", data);
		emitter.emit("message", data.message);
	});
};

main();

module.exports = app;
