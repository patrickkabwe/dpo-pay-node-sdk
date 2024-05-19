import { DPOPayment } from "@kazion/dpopay-sdk";

const initiatePaymentPayload = {
  transaction: {
    paymentAmount: 100.0,
    paymentCurrency: "ZMW",
    companyRef: "123456",
    redirectURL: "https://6384-41-216-95-231.ngrok-free.app/webhook",
    backURL: "https://6384-41-216-95-231.ngrok-free.app/back-url",
    customerFirstName: "John",
    customerLastName: "Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "1234567890",
    customerAddress: "123 Main Street",
    customerCity: "Anytown",
    customerCountry: "US",
    customerZip: "12345",
    emailTransaction: 1,
  },
  services: [
    {
      serviceType: "5525",
      serviceDescription: "Service Description",
      serviceDate: "2023-12-31",
    },
  ],
};

// Initialize DPOPayment object with your company token
const dpoPayment = new DPOPayment({
  companyToken: process.env.DPO_COMPANY_TOKEN,
  apiVersion: "v6", // optional, default is "v6"
});

// Initiating the payment request
async function initiatePayment() {
  try {
    console.log("Initiating payment...");
    const result = await dpoPayment.initiatePayment(initiatePaymentPayload);
    return result;
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
}

async function makePayment(token) {
  try {
    const result = await dpoPayment.mobileMoneyPayment({
      mno: "AirtelZM",
      mnoCountry: "zambia",
      phoneNumber: "260977123456",
      transactionToken: token,
    });

    console.log("Payment result:", result);
  } catch (error) {
    console.error("Error making payment:", error);
  }
}

async function main() {
  try {
    const result = await initiatePayment();
    await makePayment(result.transToken);
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
}

main().then(console.log).catch(console.error);
