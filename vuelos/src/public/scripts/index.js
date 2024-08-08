const templateFlightRow = document.getElementById("templateFlightRow");
const flightsTableBody = document.getElementById("flightsTableBody");
const fragment = document.createDocumentFragment();

const generalError = document.getElementById("generalError");

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const response = await fetch("/api/flights");
		const data = await response.json();

		if (data.success) {
			const flights = data.flights;

			flights.forEach((flight) => {
				const clone = templateFlightRow.content.cloneNode(true);

				const arrivalTimeCell = clone.querySelector(".arrivalTime");
				const codFlightCell = clone.querySelector(".codFlight");
				const airLineCell = clone.querySelector(".airLine");
				const delayedBCell = clone.querySelector(".delayedB");

				arrivalTimeCell.textContent = flight.arrivalTime;
				codFlightCell.textContent = flight.codFlight;
				airLineCell.textContent = flight.airLine;
				delayedBCell.textContent = flight.delayedB === 0 ? "No" : "Si";

				fragment.appendChild(clone);
			});
			flightsTableBody.appendChild(fragment);
		}
	} catch (error) {
		generalError.textContent = "Error en la conexion con la base de datos";
	}
});
