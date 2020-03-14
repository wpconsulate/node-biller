import dotenv from "dotenv";
dotenv.config();

import app from "./server/src/app";

app.listen(process.env.PORT, () => {
	console.log(
		`Listening on port ${process.env.PORT}. Please visit url http://localhost:${process.env.PORT}`
	);
});
