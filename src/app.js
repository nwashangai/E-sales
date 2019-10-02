import config from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import pingmydyno from "pingmydyno";
import router from "./routes/";

const app = express();
require("dotenv").config();
config.config();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../UI")));
app.use("/api/v1", router);
app.use((req, res, next) => {
	res.status(404);
	res.send({
		error: "404 Sorry the page has not yet been defined try /api/v1/"
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log("server started at port 3000");
	pingmydyno("https://c-planet.herokuapp.com");
});

module.exports = app; // for testing
