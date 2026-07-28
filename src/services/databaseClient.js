import mongoose from "mongoose";

import environment from "../config/environment.js";

let isConnected = false;

/**
 * Connects to MongoDB.
 * Safe to call multiple times.
 */
export async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(environment.database.uri);

    isConnected = true;

    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Unable to connect to MongoDB.");
    throw error;
  }
}

/**
 * Disconnects from MongoDB.
 */
export async function disconnectDatabase() {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();

  isConnected = false;

  console.log("Disconnected from MongoDB.");
}

/**
 * Returns whether Mongoose is currently connected.
 */
export function isDatabaseConnected() {
  return isConnected;
}

/**
 * Returns the underlying Mongoose instance.
 * Useful for advanced features and testing.
 */
export { mongoose };
