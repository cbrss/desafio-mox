import { loadFlightsOptions } from "./commons.js";

const form = document.getElementById("form");
const codFlightSelect = document.getElementById("codFlightSelect");
const templateOptionFlight = document.getElementById("templateOptionFlight");
const fragment = document.createDocumentFragment();

const submitButton = form.querySelector("button[type='submit']");
const generalError = document.getElementById("generalError");

document.addEventListener("DOMContentLoaded", async () => {
	await loadFlightsOptions(
		templateOptionFlight,
		fragment,
		codFlightSelect,
		generalError
	);
	updateForm();
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		if (!codFlightSelect.value) return;
		const codFlight = codFlightSelect.value;

		try {
			const response = await fetch(`/api/flights/delete/${codFlight}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ codFlight }),
			});

			const result = await response.json();

			if (result.success) {
				window.location.href = "/";
				codFlightSelect
					.querySelector(`option[value='${codFlight}']`)
					.remove();
				alert("Vuelo eliminado");
			} else {
				generalError.textContent += `Error en la solicitud de vuelos`;
			}
			updateForm();
		} catch (error) {
			generalError.textContent =
				"Error en la conexion con la base de datos";
		}
	});
});

const updateForm = () => {
	if (codFlightSelect.options.length <= 1) {
		generalError.textContent = "No existen vuelos cargados";

		codFlightSelect.disabled = true;
		submitButton.disabled = true;
	} else {
		codFlightSelect.disabled = false;
		submitButton.disabled = false;
	}
};
