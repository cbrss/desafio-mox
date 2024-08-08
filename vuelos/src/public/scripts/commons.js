export const loadFlightsOptions = async (
	templateOptionFlight,
	fragment,
	codFlightSelect,
	errors
) => {
	try {
		const response = await fetch("/api/flights");
		const result = await response.json();

		if (result.success) {
			const flights = result.flights;
			flights.forEach((flight) => {
				const clone = templateOptionFlight.content.cloneNode(true);
				const option = clone.querySelector("option");

				option.value = flight.codFlight;
				option.textContent = flight.codFlight;

				fragment.appendChild(clone);
			});
			codFlightSelect.appendChild(fragment);
		} else {
			errors.textContent = result.errors;
		}
	} catch (error) {
		errors.textContent = "Error en la conexion con la base de datos";
	}
};

export const clearErrors = (document) => {
	document
		.querySelectorAll(".text-error")
		.forEach((error) => (error.textContent = ""));
};
