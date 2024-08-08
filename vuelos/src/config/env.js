import env from "dotenv";
import envVar from "env-var";

env.config();

export const envs = {
	PORT: envVar.get("PORT").required().asPortNumber(),
	PUBLIC_PATH: envVar.get("PUBLIC_PATH").default("public").asString(),
	DB_HOST: envVar.get("DB_HOST").asString(),
	DB_USER: envVar.get("DB_USER").asString(),
	DB_PASS: envVar.get("DB_PASS").asString(),
	DB_NAME: envVar.get("DB_NAME").asString(),
	DB_PORT: envVar.get("DB_PORT").asString(),
};
