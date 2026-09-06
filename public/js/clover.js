const config = document.getElementById("clover-config");

const publicKey = config.dataset.publicKey;
const merchantId = config.dataset.merchantId;

const clover = new Clover(publicKey, {
  merchantId,
});

const elements = clover.elements();

const form = document.getElementById("payment-form");

const styles = {
  body: {
    margin: '0',
    padding: '10px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '18px',
    color: '#1f2937',
  },
  input: {
    height: '50px',
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    fontSize: '18px',
    transition: 'border-color 160ms ease, box-shadow 160ms ease',
  },
  'input:focus': {
    outlineOffset: '3px',
    borderColor: '#60a5fa',
    boxShadow: '0 0 0 3px rgb(147 197 253 / 0.25)',
  },
};

const cardNumber = elements.create("CARD_NUMBER", styles);
const cardDate = elements.create("CARD_DATE", styles);
const cardCvv = elements.create("CARD_CVV", styles);
const cardPostalCode = elements.create("CARD_POSTAL_CODE", styles);

cardNumber.mount("#card-number");
cardDate.mount("#card-date");
cardCvv.mount("#card-cvv");
cardPostalCode.mount("#card-postal-code");

const cardResponse = document.getElementById("card-response");
const displayCardNumberError = document.getElementById("card-number-errors");
const displayCardDateError = document.getElementById("card-date-errors");
const displayCardCvvError = document.getElementById("card-cvv-errors");
const displayCardPostalCodeError = document.getElementById(
  "card-postal-code-errors",
);

// Handle real-time validation errors from the card element
cardNumber.addEventListener("change", function (event) {
  console.log(`cardNumber changed ${JSON.stringify(event)}`);
});

cardNumber.addEventListener("blur", function (event) {
  console.log(`cardNumber blur ${JSON.stringify(event)}`);
});

cardDate.addEventListener("change", function (event) {
  console.log(`cardDate changed ${JSON.stringify(event)}`);
});

cardDate.addEventListener("blur", function (event) {
  console.log(`cardDate blur ${JSON.stringify(event)}`);
});

cardCvv.addEventListener("change", function (event) {
  console.log(`cardCvv changed ${JSON.stringify(event)}`);
});

cardCvv.addEventListener("blur", function (event) {
  console.log(`cardCvv blur ${JSON.stringify(event)}`);
});

cardPostalCode.addEventListener("change", function (event) {
  console.log(`cardPostalCode changed ${JSON.stringify(event)}`);
});

cardPostalCode.addEventListener("blur", function (event) {
  console.log(`cardPostalCode blur ${JSON.stringify(event)}`);
});

// Listen for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Use the iframe's tokenization method with the user-entered card details
  clover.createToken().then(function (result) {
    if (result.errors) {
      Object.values(result.errors).forEach(function (value) {
        // displayError.textContent = value;
        console.log(result.errors);
      });
    } else {
      cloverTokenHandler(result.token);
    }
  });
});

function cloverTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById("payment-form");
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "cloverToken");
  hiddenInput.setAttribute("value", token);
  form.appendChild(hiddenInput);
  form.submit();
}
