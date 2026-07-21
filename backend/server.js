import "dotenv/config";

import app from "./src/app.js";
import sequelize from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {

    await sequelize.authenticate();
    console.log(" Database connected successfully.");


    await sequelize.sync();
    console.log(" Database synchronized.");


    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(" Failed to start the server.");
    console.error(error);
    process.exit(1);
  }
};

startServer();