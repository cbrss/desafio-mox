import Flight from "../models/flightModel.js";

const controller = {};
const NULL_VALUE = "-1";

controller.save = async (req, res) => {
	const { arrivalTime, codFlight, airLine, delayedB } = req.body;
	const errors = validateFlightData({ arrivalTime, codFlight, airLine });

	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ success: false, errors });
	}
	const flight = new Flight(arrivalTime, codFlight, airLine, delayedB);

	try {
		await flight.save();
		res.status(200).json({
			success: true,
			message: "Flight saved",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error saving flight",
			error,
		});
	}
};

controller.delete = async (req, res) => {
	const { codFlight } = req.params;

	try {
		await Flight.delete(codFlight);
		res.status(200).json({ success: true, message: "Flight deleted" });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error deleting flight",
			error,
		});
	}
};

controller.edit = async (req, res) => {
	const { arrivalTime, airLine, delayedB } = req.body;
	const { codFlight } = req.params;
	const errors = validateFlightData({ arrivalTime, codFlight, airLine });

	if (Object.keys(errors).length > 0) {
		return res.status(400).json({
			success: false,
			errors,
		});
	}

	const flight = new Flight(arrivalTime, codFlight, airLine, delayedB);

	try {
		await flight.update();

		res.status(200).json({
			success: true,
			message: "Flight updated",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error updating flight",
		});
	}
};
controller.findAll = async (req, res) => {
	try {
		const flights = await Flight.findAll();
		res.status(200).json({
			success: true,
			flights,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error retrieving flights",
			error,
		});
	}
};

controller.find = async (req, res) => {
	try {
		const { codFlight } = req.params;
		const flight = await Flight.find(codFlight);

		if (flight) {
			res.status(200).json({
				success: true,
				flight,
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Flight not found",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error retrieving flight",
			error,
		});
	}
};

const validateFlightData = ({ arrivalTime, codFlight, airLine }) => {
	const errors = {};

	const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])/;
	const codFlightRegex = /^([A-Z]{2} [0-9]{4})$/;
	const airLineRegex = /^[a-zA-Z ]{1,30}$/;

	if (!timeRegex.test(arrivalTime))
		errors.arrivalTime = "Formato de hora incorrecto (hh:mm)";
	if (!codFlightRegex.test(codFlight))
		errors.codFlight = "Formato de codigo de vuelo incorrecto";
	if (!airLineRegex.test(airLine))
		errors.airLine = "Formato de linea aerea incorrecto";

	if (!arrivalTime)
		errors.arrivalTime = "El campo hora de llegada esta vacio.";
	if (!codFlight) errors.codFlight = "El campo numero de vuelo esta vacio.";
	if (!airLine) errors.airLine = "El campo linea aerea esta vacio.";

	if (arrivalTime === NULL_VALUE) errors.arrivalTime = "";
	if (codFlight === NULL_VALUE) errors.codFlight = "";
	if (airLine === NULL_VALUE) errors.airLine = "";

	return errors;
};

export default controller;
