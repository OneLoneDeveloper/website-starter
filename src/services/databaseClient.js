import mongoose from "mongoose";
import environment from "../config/environment.js";

/**
 * Connects to MongoDB.
 * Safe to call multiple times.
 */
export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(environment.database.uri);

    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Unable to connect to MongoDB.", error);
    throw error;
  }
}

/**
 * Disconnects from MongoDB.
 */
export async function disconnectDatabase() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();

  console.log("Disconnected from MongoDB.");
}


export function getMongooseConnectionState() {
  return mongoose.connection.readyState;
}

/**
 * Returns the underlying Mongoose instance.
 * Useful for advanced features and testing.
 */
export { mongoose };
