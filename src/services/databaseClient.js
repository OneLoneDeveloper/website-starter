import mongoose from "mongoose";
import environment from "../config/environment.js";
// The dns/promises module provides an API for performing DNS lookups using promises. It is used here only in development environments dues to issues with MongoDB not connecting otherwise.
import dns from "node:dns/promises";

// In development environments, we set custom DNS servers to avoid issues with MongoDB connections.
if (environment.isDevelopment) {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}

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
// export { mongoose };
