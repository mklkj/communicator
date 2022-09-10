const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
	"609ebec0ad5bf9c39809515c520b75eafc1ed4b8f2bd3348f5dd6bbf5f9ccbc24b07add8a31d83fc2c9637e5f5218acad5cd00e6d2a881380a06df65f0415e63";

const connectionString =
	"mongodb+srv://inzynieria:VhcL1kCXn4e4vs1W@cluster0.p7kp2wp.mongodb.net/?retryWrites=true&w=majority";

function generateAccessToken(username) {
	return jwt.sign(username, TOKEN_SECRET);
}

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
	(client) => {
		console.log("Users connected to database");
		const db = client.db("crud-quotes");
		const usersCollection = db.collection("users");
		const messagesCollection = db.collection("messages");
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.get("/users/list", (req, res) => {
			usersCollection
				.find({})
				.project({ username: 1 })
				.toArray((err, result) => {
					if (err) {
						return res.send(err);
					} else {
						return res.json(result);
					}
				});
		});

		app.post("/user/messages", (req, res) => {
			messagesCollection
				.find({
					$or: [
						{ sender: req.body.uid, receiver: req.body.friend },
						{ sender: req.body.friend, receiver: req.body.uid },
					],
				})
				.toArray((err, result) => {
					if (err) {
						return res.send(err);
					} else {
						return res.json(result);
					}
				});
		});

		app.post("/users/register", (req, res) => {
			usersCollection.count({ username: req.body.username }).then((count) => {
				if (count > 0) {
					return res.status(400).json({ error: "User already exists" });
				}
				bcrypt.hash(req.body.password, 11, function (err, hash) {
					usersCollection
						.insertOne({
							username: req.body.username,
							password: hash,
							isPasswordConfirmed: false,
						})
						.then((result) => res.send("User added"));
				});
			});
		});

		app.post("/user/confirm-password", (req, res) => {
			bcrypt.hash(req.body.password, 11, (err, hash) => {
				usersCollection
					// .replaceOne(
					// 	{ username: req.body.username },
					// 	{
					// 		username: req.body.username,
					// 		password: hash,
					// 		isPasswordConfirmed: true,
					// 	}
					// )
					.updateOne(
						{ username: req.body.username },
						{
							$set: {
								username: req.body.username,
								password: hash,
								isPasswordConfirmed: true,
							},
						}
					)
					.then((response) => {
						return res.json({ isPasswordConfirmed: true });
					})
					.catch((reason) => {
						console.error(reason);
						res
							.status(400)
							.json({ isPasswordConfirmed: false, error: reason.message });
					});
			});
		});

		app.post("/users/login", (req, res) => {
			usersCollection
				.findOne({ username: req.body.username })
				.then((response) => {
					if (response == null) {
						return res.send(false);
					}
					bcrypt.compare(
						req.body.password,
						response.password,
						function (err, result) {
							if (result === true) {
								const token = generateAccessToken(
									req.body.username,
									TOKEN_SECRET
								);
								const responseBody = {
									token,
									id: response._id,
									isPasswordConfirmed: response.isPasswordConfirmed,
								};
								return res.json(responseBody);
							}
							return res.send(false);
						}
					);
				})
				.catch((reason) => {
					console.error(reason);
					res.status(400).json({ error: reason.message });
				});
		});
	}
);

module.exports = app;
