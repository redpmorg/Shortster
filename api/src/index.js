import app from "./app.js";
import sequelize from "./sequelize.js";

const port = 8080;
const server = app.listen(port);

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, p) =>
  console.error("Unhandled Rejection at: Promise ", p, reason)
);

async function init() {
  await assertDatabaseConnectionOk();

  server.on("listening", () =>
    console.info(
      "UrlShortner application started on http://%s:%d",
      "localhost",
      port
    )
  );
}

init();
