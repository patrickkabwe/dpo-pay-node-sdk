## DPO Node SDK

### Introduction

The `@kazion/dpo-node-sdk` is a npm package for node js which provides a convenient interface for interacting with the DPO API to process various payment operations. The package is designed to simplify the integration of DPO payment functionalities into your application.

### Installation

To install `@kazion/dpo-node-sdk`, use the following command:

```bash
yarn add @kazion/dpo-node-sdk #works with other package managers too
```

### Usage

To use the package, import it into your project as follows:

```javascript
import { DPOPayment } from "@kazion/dpo-node-sdk";
```

### Configuration

The package requires a configuration object to be passed to it. The configuration object contains the following properties:

- `companyToken`: This is the company token provided by DPO.
- `apiVersion`: This is the version of the DPO API to use. The default value is `v6`.

### Payment Operations

The package provides the following payment operations:

- `initiatePayment`: This method initiates a payment request to the DPO API.

- `chargeMobilePayment`: This method initiates a mobile money payment request to the DPO API.

- `chargeCardPayment`: This method initiates a card payment request to the DPO API.

- `refundPayment`: This method initiates a payment refund request to the DPO API.

- `cancelPayment`: This method initiates a payment cancellation request to the DPO API.

- `checkPaymentStatus`: This method checks the status of a payment request to the DPO API.

### Examples

#### Initiate Payment

```javascript
import { DPOPayment } from "@kazion/dpo-node-sdk";

const dpoPayment = new DPOPayment({
  companyToken: "your_company_token",
  apiVersion: "/v6/", // optional, default is "/v6/"
});

const initiatePaymentPayload: InitiatePaymentPayloadObject = {
  Transaction: {
    PaymentAmount: 100.0,
    PaymentCurrency: "USD",
    CompanyRef: "123456",
    RedirectURL: "https://example.com/redirect",
    BackURL: "https://example.com/back",
    customerFirstName: "John",
    customerLastName: "Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "1234567890",
    customerAddress: "123 Main Street",
    customerCity: "Anytown",
    customerCountry: "US",
    customerZip: "12345",
    EmailTransaction: 1,
  },
  Services: [
    {
      Service: {
        ServiceType: "123",
        ServiceDescription: "Service Description",
        ServiceDate: "2023-12-31",
        ServiceFrom: "10:00 AM",
        ServiceTo: "12:00 PM",
      },
    },
  ],
};

// Initialize DPOPayment object with your company token
const dpoPayment = new DPOPayment({
  companyToken: "your_company_token",
  apiVersion: "/v6/", // optional, default is "/v6/"
});

// Initiating the payment request
async function initiatePayment() {
  try {
    const result = await dpoPayment.initiatePayment(initiatePaymentPayload);
    console.log("Payment initiated successfully:", result);
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
}

// Call the function to initiate the payment
initiatePayment();
```

#### Charge Mobile Payment

```javascript
import { DPOPayment } from "dpopayment";

// Example payload for charging a mobile payment
const chargeMobilePaymentPayload: ChargeMobilePaymentObject = {
  TransactionToken: "your_transaction_token",
  PhoneNumber: "1234567890",
  MNO: "MTNZM", // Mobile Network Operator
  MNOcountry: "zambia",
};

// Initialize DPOPayment object with your company token
const dpoPayment = new DPOPayment({
  companyToken: "your_company_token",
  apiVersion: "/v6/", // optional, default is "/v6/"
});

// Charging the mobile payment
async function chargeMobilePayment() {
  try {
    const result = await dpoPayment.chargeMobilePayment(
      chargeMobilePaymentPayload
    );
    console.log("Mobile payment charged successfully:", result);
  } catch (error) {
    console.error("Error charging mobile payment:", error);
  }
}

// Call the function to charge the mobile payment
chargeMobilePayment();
```

### License

This package is distributed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

### Support

For support, please contact us at patrickckabwe@gmail.com

### Acknowledgements

- [DPO Group](https://www.directpay.online/)
