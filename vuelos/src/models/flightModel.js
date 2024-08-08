import mysql from "mysql2/promise";
import { envs } from "../config/env.js";

class Flight {
	constructor(arrivalTime, codFlight, airLine, delayedB) {
		this.arrivalTime = arrivalTime;
		this.codFlight = codFlight;
		this.airLine = airLine;
		this.delayedB = delayedB;
	}

	static async getConnection() {
		return mysql.createPool({
			host: envs.DB_HOST,
			port: envs.DB_PORT,
			user: envs.DB_USER,
			password: envs.DB_PASS,
			database: envs.DB_NAME,
		});
	}

	async save() {
		const connection = await Flight.getConnection();

		try {
			await connection.execute(
				"INSERT INTO flight (codFlight, arrivalTime, airLine, delayedB) VALUES (?, ?, ?, ?)",
				[
					this.codFlight,
					this.arrivalTime,
					this.airLine,
					this.delayedB === "on" ? 1 : 0,
				]
			);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}

	static async delete(codFlight) {
		const connection = await Flight.getConnection();
		try {
			await connection.execute("DELETE FROM flight WHERE codFlight = ?", [
				codFlight,
			]);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	static async findAll() {
		const connection = await Flight.getConnection();
		try {
			const [flights] = await connection.execute("SELECT * FROM flight");
			return flights;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}

	static async find(codFlight) {
		const connection = await Flight.getConnection();
		try {
			const [flight] = await connection.execute(
				"SELECT * FROM flight WHERE codFlight = ?",
				[codFlight]
			);

			return flight[0];
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}

	async update() {
		const connection = await Flight.getConnection();
		try {
			await connection.execute(
				"UPDATE flight SET arrivalTime = ?, airLine = ?, delayedB = ? WHERE codFlight = ?",
				[
					this.arrivalTime,
					this.airLine,
					this.delayedB === "on" ? 1 : 0,
					this.codFlight,
				]
			);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}

export default Flight;
