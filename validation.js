const emailField = document.getElementById("email-field");
const emailErrorField = document.getElementById("email-error");
const countryField = document.getElementById("country-field");
const countryErrorField = document.getElementById("country-error");
const zipField = document.getElementById("zip-field");
const zipErrorField = document.getElementById("zip-error");

const validateEmail = (e) => {
  if (emailField.checkValidity()) {
    emailField.setCustomValidity("");
    console.log("valid");
    styleNoError("email");
    // } else if (emailField.validity.valueMissing) {
    //   emailErrorField.classList.remove("no-error");
    //   emailField.setCustomValidity(" ❌ Please enter an email address");
    //   // emailField.reportValidity();
    //   console.log("invalid");
  } else {
    emailErrorField.classList.remove("no-error");
    emailErrorField.textContent = emailField.validationMessage;
    console.log("invalid");
    console.log(emailField.validity);
    // emailField.reportValidity();
  }
};

const validateCountry = () => {
  if (!countryField.checkValidity()) {
    countryErrorField.classList.remove("no-error");
    countryErrorField.textContent = countryField.validationMessage;
    return;
  } else {
    countryField.setCustomValidity("");
    // countryErrorField.classList.add("no-error");
    styleNoError("country");
  }
};

const validateZip = () => {
  if (!countryField.value) {
    alert("Please select a country first");
    return;
  }
  const countryRegex = postalRegex[countryField.value];
  console.log(countryField.value);

  // Build constraint checker
  const constraint = new RegExp(countryRegex, "");
  console.log(constraint);

  // Check it
  if (constraint.test(zipField.value)) {
    zipField.setCustomValidity("");
    styleNoError("zip");
    console.log("valid");
  } else {
    zipField.setCustomValidity(
      "Please match the following regex: " + constraint
    );
    zipErrorField.classList.remove("no-error");
    zipErrorField.textContent = zipField.validationMessage;
  }
};

const styleNoError = (input) => {
  const msgDiv = document.getElementById(`${input}-error`);
  msgDiv.classList.add("no-error");
  msgDiv.textContent = "✅ Nice!";
  console.log(msgDiv);
};

const postalRegex = {};

async function fetchPostalCodeRegex() {
  const response = await fetch("postalCodeData.xml");
  const xmlString = await response.text();
  const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
  const postalCodeRegex = xmlDocument.getElementsByTagName("postCodeRegex");

  for (let i = 0; i < postalCodeRegex.length; i++) {
    const countryCode = postalCodeRegex[i].getAttribute("territoryId");
    let regex = postalCodeRegex[i].textContent;
    // Append "^" and "$"" to the regex to match exact string
    regex = "^" + regex + "$";
    postalRegex[countryCode] = regex;
  }
}

// Populate the postal code regex object
fetchPostalCodeRegex();

// Event Listener
emailField.addEventListener("input", validateEmail);
countryField.addEventListener("input", validateCountry);
zipField.addEventListener("input", validateZip);
