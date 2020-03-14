const AuthModel = require("../models/AuthModel");
const helper = require("../helpers/global");
const authHelper = require("../helpers/auth");
var validator = require("validator");
const Config = require("../config");

// ------------------------------------------------------------------------------
// User Validation

isValidInput = (req, res, next) => {
	// Check Email exists
	if (req.body.email === undefined)
		return helper.sendError(res, 400, "Email is required");
	else if (!validator.isEmail(req.body.email))
		return helper.sendError(res, 400, "Invalid email provided");
	else if (req.body.secret === undefined)
		return helper.sendError(res, 400, "Secret is required");
	else if (validator.isLength(req.body.secret, { max: 1 }))
		return helper.sendError(res, 400, "Secret is required!");
	else return "OK";
};

isPasswordAndUserMatch = (req, res, next) => {
	AuthModel.findByEmail(req.body.email)
		.then(user => {
			if (user.length) {
				user = user[0];
				authHelper
					.comparePassword(req.body.secret, user["password"])
					.then(function(result) {
						if (result) {
							// req.body.user_data = useruser;
							return next();
						}
					})
					.catch(function(error) {
						return helper.sendError(
							res,
							400,
							"Email & passwords combination doesn't match!"
						);
					});
			}
		})
		.catch(function(err) {
			return helper.sendError(res, 400, err + ": Invalid User!");
			// return helper.sendError(res, 400, "Invalid User!");
		});
};

exports.validateVals = (req, res, next) => {
	const validInput = isValidInput(req, res, next);
	if ("OK" == validInput) {
		return isPasswordAndUserMatch(req, res, next);
	}
	return validInput;
};

// ------------------------------------------------------------------------------
// User registration Validation

isEmailExists = (req, res, next) => {
	AuthModel.findByEmail(req.body.email)
		.then(user => {
			if (user[0].length) {
				return helper.sendError(
					res,
					409,
					"User already exists with given Email! Try forgot password!"
				);
			}
			return next();
		})
		.catch(function(err) {
			console.log("err", err.sqlMessage);
			return helper.sendError(res, 400, "Some Internal Error Occurred!");
		});
};

exports.validateUserdata = (req, res, next) => {
	const validInput = isValidInput(req, res, next);
	if ("OK" == validInput) {
		return isEmailExists(req, res, next);
	}
	return validInput;
};

// ------------------------------------------------------------------------------
// Forgot Password validate

isValidEmail = (req, res, next) => {
	// Check Email exists
	if (req.params.email === undefined)
		return helper.sendError(res, 400, "Email is required");
	else if (!validator.isEmail(req.params.email))
		return helper.sendError(res, 400, "Invalid email provided");
	else return "OK";
};

isEmailExistsInDB = (req, res, next) => {
	AuthModel.findByEmail(req.params.email)
		.then(user => {
			if (user[0].length) {
				var $user = user[0][0];
				req.body.user_data = $user;
				return next();
			}
			return helper.sendError(
				res,
				409,
				"User doesn't Exists, Please Check your email again!"
			);
		})
		.catch(function(err) {
			console.log("err", err.sqlMessage);
			return helper.sendError(res, 400, "Some Internal Error Occurred!");
		});
};

exports.forgotPass = (req, res, next) => {
	const validEmail = isValidEmail(req, res, next);

	if ("OK" == validEmail) {
		isEmailExistsInDB(req, res, next);
	}
	return validEmail;
};

// ------------------------------------------------------------------------------
// UpdatePssword Call Data validate

exports.validateUpdatePassData = (req, res, next) => {
	// Check Email exists
	if (req.body.email !== req.params.email)
		return helper.sendError(res, 400, "Invalid API Call!");
	else if (req.body.email === undefined)
		return helper.sendError(res, 400, "Email is required");
	else if (!validator.isEmail(req.body.email))
		return helper.sendError(res, 400, "Invalid email provided");
	else if (req.body.token === undefined)
		return helper.sendError(
			res,
			400,
			"Something Wrong happened Please try again later"
		);
	else if (req.body.token.length != Config.RESET_TOKEN_SIZE)
		return helper.sendError(res, 400, "Invalid Reset Token!");
	else if (req.body.password === undefined)
		return helper.sendError(res, 400, "Password is required!");
	else if (req.body.confirmPassword === undefined)
		return helper.sendError(res, 400, "Confirm Password is required!");
	else if (req.body.password !== req.body.confirmPassword)
		return helper.sendError(res, 400, "Passwords do not Match!");
	else return next();
};
