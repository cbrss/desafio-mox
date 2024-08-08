import { loadFlightsOptions, clearErrors } from "./commons.js";

const form = document.getElementById("editForm");
const codFlightSelect = document.getElementById("codFlightSelect");
const templateOptionFlight = document.getElementById("templateOptionFlight");
const fragment = document.createDocumentFragment();

const arrivalTimeInput = document.querySelector("input[name='arrivalTime']");
const airLineInput = document.querySelector("input[name='airLine']");
const delayedBInput = document.querySelector("input[name='delayedB']");
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

	codFlightSelect.addEventListener("change", async () => {
		const selectedCodFlight = codFlightSelect.value;
		const flightDetails = await loadFlightDetails(selectedCodFlight);

		if (flightDetails && flightDetails.success) {
			const flight = flightDetails.flight;
			arrivalTimeInput.placeholder = flight.arrivalTime;
			airLineInput.placeholder = flight.airLine;
			delayedBInput.checked = flight.delayedB === 1;
		}
	});
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		if (!codFlightSelect.value) return;
		const codFlight = codFlightSelect.value;

		try {
			const response = await fetch(`/api/flights/edit/${codFlight}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			clearErrors(document);

			if (result.success) {
				alert("Vuelo modificado");
				form.reset();
				window.location.href = "/";
			} else {
				for (const [field, error] of Object.entries(result.errors)) {
					const errorElement = document.getElementById(
						`${field}Error`
					);
					if (errorElement) {
						errorElement.textContent = error;
					}
				}
			}
			updateForm();
		} catch (error) {
			generalError.textContent =
				"Error en la conexion con la base de datos";
		}
	});

	const loadFlightDetails = async (codFlight) => {
		try {
			const response = await fetch(`/api/flights/${codFlight}`);
			const result = await response.json();
			return result;
		} catch (error) {
			generalError.textContent =
				"Error en la conexion con la base de datos";
			return null;
		}
	};
});

const updateForm = () => {
	if (codFlightSelect.options.length <= 1) {
		generalError.textContent = "No existen vuelos cargados";

		codFlightSelect.disabled = true;
		arrivalTimeInput.disabled = true;
		airLineInput.disabled = true;
		delayedBInput.disabled = true;
		submitButton.disabled = true;
	} else {
		generalError.style.display = "none";
		codFlightSelect.disabled = false;
		arrivalTimeInput.disabled = false;
		airLineInput.disabled = false;
		delayedBInput.disabled = false;
		submitButton.disabled = false;
	}
};
