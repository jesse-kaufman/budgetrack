/** @file Vitest setup script. */
import dotenv from "dotenv"

// Read .env.test for env vars in testing
dotenv.config({ path: ".env.test", quiet: true })
