import express from "express";
import path from "path";
import morgan from "morgan";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import flightRoutes from "../routes/flightRoute.js";

export const startServer = (options) => {
	const { port } = options;

	const app = express();

	// cfg
	app.set("port", port || 3000);

	// middlewares
	app.use(morgan("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// api route
	app.use("/api/flights", flightRoutes);
	// page routes
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});
	app.get("/register", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/register_flight.html"));
	});
	app.get("/edit", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/edit_flight.html"));
	});
	app.get("/delete", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/del_flight.html"));
	});

	// static files: html, css, js
	app.use(express.static(path.join(__dirname, "../public")));

	app.listen(app.get("port"));
};
