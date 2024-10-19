import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from "dotenv";

dotenv.config();

createConnection()
  .then(async (connection) => {
    console.log("Connected to the database!");

    // Example: Add a new user
    const user = new User();

    await connection.manager.save(user);
    console.log("New user has been saved:", user);

    // Example: Load all users
    const users = await connection.manager.find(User);
    console.log("All users:", users);
  })
  .catch((error) => console.log(error));
