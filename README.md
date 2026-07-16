# ArcInvoice

ArcInvoice is a modern fintech-inspired invoice app built with Next.js, TypeScript, Tailwind CSS, Ethers.js, and React QR Code. It includes a polished landing page, invoice creation flow, dashboard, and transaction history with mock Arc Testnet payment behavior for now.

## Features
- Connect an Arc Testnet wallet
- Create invoices with customer name, service description, and amount
- Generate a payment QR code
- Show invoice payment status as Pending or Paid
- Display recent transaction history
- Responsive dark theme landing experience

## Project Structure
- components/
- pages/
- lib/
- utils/

## Run locally
1. Install dependencies:
   npm install
2. Start the dev server:
   npm run dev
3. Open http://localhost:3000

## Environment variables
Copy .env.example to .env.local and update values when real Arc RPC or contract integration is added.

## Notes
- Mock Arc Testnet transactions are used for now.
- Add your Arc RPC URL and contract address in the environment variables and in the invoice creation flow when ready.
