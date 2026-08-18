import { v4 as uuidv4 } from "uuid";
import environment from "../config/environment.js";

const CLOVER_CHARGES_URL = environment.clover.chargesUrl;

export async function createCharge({ amount, token, clientIp }) {
  const amountInCents = Math.round(Number(amount) * 100);

  const response = await fetch(CLOVER_CHARGES_URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${environment.clover.apiToken}`,
      "Idempotency-Key": uuidv4(),
      "x-forwarded-for": clientIp,
    },

    body: JSON.stringify({
      amount: amountInCents,
      currency: "usd",
      source: token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Clover payment failed.",
    );

    error.statusCode = response.status;
    error.details = data;

    throw error;
  }

  return data;
}