import { clearErrors } from "./commons.js";

const form = document.getElementById("registerForm");
const generalError = document.getElementById("generalError");

document.addEventListener("DOMContentLoaded", () => {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch("/api/flights/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			clearErrors(document);

			if (result.success) {
				window.location.href = "/";
				form.reset();
				alert("Vuelo registrado");
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
		} catch (error) {
			generalError.textContent =
				"Error en la conexion con la base de datos";
		}
	});
});
