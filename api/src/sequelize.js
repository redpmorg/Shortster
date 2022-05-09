import { Sequelize } from "sequelize";
import url from "./models/url.js";

//TODO: use dotenv
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sqlite-urlshortner-database/shortner-db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

url(sequelize)

sequelize.sync({alter: true})
// sequelize.sync({force: true})
export default sequelize;
