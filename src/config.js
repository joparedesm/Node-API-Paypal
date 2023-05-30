import { config } from 'dotenv';
config();

export const PORT = 4000;
export const HOST = "http://localhost:" + PORT;

export const PAYPAL_KEY = process.env.PAYPAL_KEY || "Secret_Key";
export const PAYPAL_Client = process.env.PAYPAL_Client || "Client_ID";
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

