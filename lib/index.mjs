import{isAxiosError as V}from"axios";var u=class extends Error{code;response;constructor(n,e=0,o){super(n),this.name="DPOError",this.code=e,this.response=o}};function g(t){return t.replace(/[\s_-]+(\w)/g,function(n,e){return e.toUpperCase()}).replace(/(?:^\w|[A-Z]|\b\w)/g,function(n,e){return e===0?n.toLowerCase():n.toUpperCase()}).replace(/\s+/g,"")}import{XMLParser as U}from"fast-xml-parser";var h=t=>new U().parse(t);var P=(t,n=!0)=>{let e=h(t),o=e.API3G?.StatusCode||e.API3G?.Result,s=e.API3G?.ResultExplanation||"success",p=Object.entries(e.API3G).map(([y,i])=>{if(typeof i=="object"&&i!==null){let a=Object.entries(i).map(([d,l])=>({[g(d)]:l})).reduce((d,l)=>({...d,...l}));return{[g(y)]:a}}return{[g(y)]:i}}).reduce((y,i)=>({...y,...i}));switch(n&&(delete p.result,delete p.resultExplanation),o){case 0:case 130:case 900:case"success":return{...p,statusCode:200,message:s};default:return{...p,statusCode:400,message:s}}},A=t=>{try{return{dpoJsonResponse:P(t,!1),dpoXMLResponse:`
<?xml version="1.0" encoding="UTF-8"?>
<API3G>  
  <Response>OK</Response>
</API3G>
`}}catch(n){return{dpoJsonResponse:{status:"error",statusCode:500,message:n.message},dpoXMLResponse:`
<?xml version="1.0" encoding="UTF-8"?>
<API3G>
  <Response>Failed</Response>
  <Result>Failed</Result>
  <ResultExplanation>${n.message}</ResultExplanation>
</API3G>
`}}};var c=t=>{if(V(t)){delete t.response?.data["?xml"];let n=P(t.response?.data);throw new u(n.message,t.response?.status,{message:n.message,statusCode:n.statusCode})}throw t};var f=t=>{let{services:n,transaction:e}=t,{backURL:o,redirectURL:s,companyRef:p,paymentAmount:y,paymentCurrency:i,allowRecurrent:a,companyRefUnique:d,defaultPaymentCountry:l,ptl:M,ptlType:v,transactionChargeType:L,...G}=e;return{Transaction:{BackURL:o,RedirectURL:s,CompanyRef:p,PaymentAmount:y,PaymentCurrency:i,AllowRecurrent:a,CompanyRefUnique:d,DefaultPaymentCountry:l,PTL:M,PTLtype:v,TransactionChargeType:L,...G},Services:n.map(C=>({Service:{ServiceType:C.serviceType,ServiceDescription:C.serviceDescription,ServiceDate:C.serviceDate,ServiceFrom:C.serviceFrom,ServiceTo:C.serviceTo}})),Additional:t.additional}},T=t=>({MNO:t.mno,MNOcountry:t.mnoCountry,PhoneNumber:t.phoneNumber,TransactionToken:t.transactionToken}),R=t=>({TransactionToken:t.transactionToken,CardHolderName:t.cardHolderName,CreditCardCVV:t.creditCardCVV,CreditCardExpiry:t.creditCardExpiry,CreditCardNumber:t.creditCardNumber,ChargeType:t.chargeType}),I=t=>({refundAmount:t.refundAmount,refundDetails:t.refundDetails,TransactionToken:t.transactionToken}),k=t=>({TransactionToken:t.transactionToken}),x=t=>({TransactionToken:t.transactionToken});import w from"axios";var b=w.create({baseURL:process.env.DPO_BASE_URL||"https://secure.3gdirectpay.com/API",headers:{"Content-Type":"application/xml"}});import{XMLBuilder as Z}from"fast-xml-parser";var N=t=>`<?xml version="1.0" encoding="utf-8"?>${new Z().build(t)}`;async function m(t,n){let e=N(t),o=await b.post(`/${n}/`,e);delete o.data["?xml"];let s=P(o.data);if(s.statusCode!==200)throw new u(s.message,s.statusCode,{message:s.message,statusCode:s.statusCode});return s}var F=(r=>(r.ZAMBIA_MTN="MTNZM",r.ZAMBIA_AIRTEL="AirtelZM",r.RWANDA_MTN="MTN",r.RWANDA_AIRTEL="AirtelRW",r.MALAWI_AIRTEL="AirtelMW",r.UGANDA_MTN="MTNmobilemoney",r.UGANDA_AIRTEL="Mobile_Airtel_UG",r.TANZANIA_SELCOM_ZANTEL="Selcom_webPay_Zantel",r.TANZANIA_SELCOM_HALOTEL="Selcom_webPay_Halotel",r.TANZANIA_TIGO="TIGOdebitMandate",r.TANZANIA_SELCOM="Selcom_webPay",r.TANZANIA_SELCOM_TTCL="Selcom_webPay_TTCL",r.TANZANIA_AIRTEL="AirtelTZ",r.GHANA_VODA="VodaGH",r.GHANA_MTN="MTN",r.KENYA_SAFARICOM="SafaricomSTKv2",r.KENYA_AIRTEL="AirtelKE",r.ZIMBABWE_ECOCASH="EcoCash",r))(F||{}),D=(a=>(a.CREATE_TOKEN="createToken",a.REFUND_TOKEN="refundToken",a.UPDATE_TOKEN="updateToken",a.VERIFY_TOKEN="verifyToken",a.CANCEL_TOKEN="cancelToken",a.CHARGE_TOKEN_BANK_TRANSFER="chargeTokenBankTransfer",a.CHARGE_TOKEN_CREDIT_CARD="chargeTokenCreditCard",a.CHARGE_TOKEN_MOBILE="chargeTokenMobile",a))(D||{}),H=(e=>(e.MOBILE_MONEY="mobileMoney",e.CARD="card",e))(H||{});var S=class{companyToken;apiVersion;paymentURL;constructor({companyToken:n,apiVersion:e="v6"}){this.companyToken=n,this.apiVersion=e,this.paymentURL=process.env.DPO_PAYMENT_URL||"https://secure.3gdirectpay.com/payv3.php"}async initiatePayment(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"createToken",...f(n)}},o=await m(e,this.apiVersion);return{...o,paymentURL:`${this.paymentURL}?ID=${o.transToken}`}}catch(e){return c(e)}}async processMobileMoneyPayment(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"chargeTokenMobile",...T(n)}};return m(e,this.apiVersion)}catch(e){return c(e)}}async processCardPayment(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"chargeTokenCreditCard",...R(n)}};return m(e,this.apiVersion)}catch(e){return c(e)}}refundPayment(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"refundToken",...I(n)}};return m(e,this.apiVersion)}catch(e){return c(e)}}cancelPayment(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"cancelToken",...k(n)}};return m(e,this.apiVersion)}catch(e){return c(e)}}checkPaymentStatus(n){try{let e={API3G:{CompanyToken:this.companyToken,Request:"verifyToken",...x(n)}};return m(e,this.apiVersion)}catch(e){return c(e)}}parseWebhookXML(n){return A(n)}};export{S as DPOPayment,D as DPO_REQUEST_TYPE,F as MOBILE_NETWORK_OPERATOR,H as PAYMENT_STRATEGY_TYPE};
