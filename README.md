## DPOPay Node SDK

### Introduction

UnOfficial Node.js DPO SDK that provides a convenient interface for interacting with the DPO API to process various payment operations. The package is designed to simplify the integration of DPO payment functionalities into your application.

### Installation

To install `@kazion/dpopay-sdk`, use the following command:

```bash
yarn add @kazion/dpopay-sdk #works with other package managers too
```

### Usage

To use the package, import it into your project as follows:

```javascript
import { DPOPayment } from "@kazion/dpopay-sdk";
```

### Configuration

The package requires a configuration object to be passed to it. The configuration object contains the following properties:

- `companyToken`: This is the company token provided by DPO.
- `apiVersion`: This is the version of the DPO API to use. The default value is `v6`.
- `DPO_PAYMENT_URL`: This should be defined in your `.env` file. The default value is `https://secure.3gdirectpay.com/payv3.php`.

### Payment Operations

The package provides the following payment operations:

- `initiatePayment`: This method initiates a payment request to the DPO API.

- `processMobileMoneyPayment`: This method initiates a mobile money payment request to the DPO API.

- `processCardPayment`: This method initiates a card payment request to the DPO API.

- `refundPayment`: This method initiates a payment refund request to the DPO API.

- `cancelPayment`: This method initiates a payment cancellation request to the DPO API.

- `checkPaymentStatus`: This method checks the status of a payment request to the DPO API.

### Examples
For detailed examples, please refer to the [examples](examples) directory.

#### Initiate Payment

```javascript
import { DPOPayment } from "@kazion/dpopay-sdk";

const dpoPayment = new DPOPayment({
  companyToken: "your_company_token",
  apiVersion: "v6", // optional, default is "v6"
});

const initiatePaymentPayload: InitiatePaymentPayloadObject = {
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
  companyToken: "your_company_token",
  apiVersion: "v6", // optional, default is "v6"
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
  transactionToken: "your_transaction_token",
  phoneNumber: "1234567890",
  mno: "MTNZM", // Mobile Network Operator
  mnoCountry: "zambia",
};

// Initialize DPOPayment object with your company token
const dpoPayment = new DPOPayment({
  companyToken: "your_company_token",
  apiVersion: "v6", // optional, default is "v6"
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

For support, please contact me at patrickckabwe@gmail.com

### Acknowledgements

- [DPO Group](https://www.directpay.online/)
