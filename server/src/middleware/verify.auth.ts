const authHelper = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const Config = require("../config");

exports.verifyRefreshBodyField = (req, res, next) => {
	if (req.body && req.body.refresh_token) {
		return next();
	} else {
		return res
			.status(400)
			.send({ error: "need to pass refresh_token field" });
	}
};

exports.validRefreshNeeded = (req, res, next) => {
	authHelper
		.compareRefToken(req)
		.then(function(res) {
			req.body = req.jwt;
			return next();
		})
		.catch(function(error) {
			return res.status(400).send({ error: "Invalid refresh token" });
		});
};

exports.validJWTNeeded = (req, res, next) => {
	if (req.headers["authorization"]) {
		try {
			let authorization = req.headers["authorization"].split(" ");
			if (authorization[0] !== "Bearer") {
				return res.status(401).json({ error: "Unauthorised Access!" });
			} else {
				req.jwt = jwt.verify(authorization[1], Config.JWT_SECRET);
				return next();
			}
		} catch (err) {
			return res.status(403).send();
		}
	} else {
		return res.status(401).send();
	}
};
