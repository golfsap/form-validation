const emailField = document.getElementById("email-field");
const emailErrorField = document.getElementById("email-error");
const countryField = document.getElementById("country-field");
const countryErrorField = document.getElementById("country-error");
const zipField = document.getElementById("zip-field");
const zipErrorField = document.getElementById("zip-error");
const passwordField = document.getElementById("password-field");
const passwordErrorField = document.getElementById("password-error");
const confirmPwField = document.getElementById("confirm-password-field");
const confirmPwErrorField = document.getElementById("confirm-password-error");
const submitBtn = document.getElementById("submit-btn");

const validateEmail = (e) => {
  if (emailField.checkValidity()) {
    emailField.setCustomValidity("");
    console.log("valid");
    styleNoError("email");
  } else {
    emailErrorField.classList.remove("no-error");
    emailErrorField.textContent = emailField.validationMessage;
    console.log("invalid");
    console.log(emailField.validity);
  }
};

const validateCountry = () => {
  if (!countryField.checkValidity()) {
    countryErrorField.classList.remove("no-error");
    countryErrorField.textContent = countryField.validationMessage;
    return;
  } else {
    countryField.setCustomValidity("");
    styleNoError("country");
  }
};

const validateZip = () => {
  if (!countryField.value) {
    alert("Please select a country first");
    return;
  }

  if (zipField.validity.valueMissing) {
    zipErrorField.classList.remove("no-error");
    zipErrorField.textContent = zipField.validationMessage;
    return;
  }

  const countryRegex = postalRegex[countryField.value];
  console.log(countryField.value);

  // Build constraint checker
  const constraint = new RegExp(countryRegex);
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

const validateUppercase = () => {
  const uppercaseConstraint = new RegExp("[A-Z]");
  const uppercasePara = document.getElementById("uppercase");
  if (uppercaseConstraint.test(passwordField.value)) {
    uppercasePara.classList.add("no-error");
    uppercasePara.textContent = "✅ At least one uppercase letter";
    console.log("valid");
    return true;
  } else {
    passwordField.setCustomValidity("At least one uppercase letter");
    uppercasePara.textContent = passwordField.validationMessage;
    uppercasePara.classList.remove("no-error");
    return false;
  }
};

const validateLowercase = () => {
  const lowercaseConstraint = new RegExp("[a-z]");
  const lowercasePara = document.getElementById("lowercase");
  if (lowercaseConstraint.test(passwordField.value)) {
    lowercasePara.classList.add("no-error");
    lowercasePara.textContent = "✅ At least one lowercase letter";
    console.log("valid");
    return true;
  } else {
    passwordField.setCustomValidity("At least one lowercase letter");
    lowercasePara.textContent = passwordField.validationMessage;
    lowercasePara.classList.remove("no-error");
    return false;
  }
};

const validateDigit = () => {
  const digitConstraint = new RegExp("[0-9]");
  const digitPara = document.getElementById("digit");
  if (digitConstraint.test(passwordField.value)) {
    digitPara.classList.add("no-error");
    digitPara.textContent = "✅ At least one digit";
    console.log("valid");
    return true;
  } else {
    passwordField.setCustomValidity("At least one digit");
    digitPara.textContent = passwordField.validationMessage;
    digitPara.classList.remove("no-error");
    return false;
  }
};

const validatePasswordLength = () => {
  const charactersPara = document.getElementById("characters");
  if (passwordField.value.length >= 8) {
    charactersPara.classList.add("no-error");
    charactersPara.textContent = "✅ At least 8 characters long";
    return true;
  } else {
    passwordField.setCustomValidity("At least 8 characters long");
    charactersPara.textContent = passwordField.validationMessage;
    charactersPara.classList.remove("no-error");
    return false;
  }
};

const validatePasswordUsingRegex = () => {
  validateLowercase();
  validateUppercase();
  validateDigit();
  validatePasswordLength();

  if (
    validateLowercase() &&
    validateUppercase() &&
    validateDigit() &&
    validatePasswordLength()
  ) {
    passwordField.setCustomValidity("");
  }
};

const validatePasswordConfirm = () => {
  if (confirmPwField.validity.valueMissing) {
    confirmPwErrorField.classList.remove("no-error");
    confirmPwField.setCustomValidity("Please confirm your password");
    confirmPwErrorField.textContent = confirmPwField.validationMessage;
    return;
  }
  if (confirmPwField.value === passwordField.value) {
    confirmPwField.classList.remove("no-error");
    confirmPwField.setCustomValidity("");
    styleNoError("confirm-password");
  } else {
    confirmPwField.setCustomValidity("Passwords do not match");
    confirmPwErrorField.classList.remove("no-error");
    confirmPwErrorField.textContent = confirmPwField.validationMessage;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (
    emailField.checkValidity() &&
    countryField.checkValidity() &&
    zipField.checkValidity() &&
    passwordField.checkValidity() &&
    confirmPwField.checkValidity()
  ) {
    alert("🙌 High five! You completed the form.");
  } else {
    alert("❌ Form incomplete. Low five :(");
  }
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

// Event Listeners
emailField.addEventListener("input", validateEmail);
countryField.addEventListener("input", () => {
  // Validate zip everytime country changes
  validateCountry();
  validateZip();
});
zipField.addEventListener("input", validateZip);
passwordField.addEventListener("input", () => {
  // Validate password confirmation everytime password changes
  validatePasswordUsingRegex();
  validatePasswordConfirm();
});
confirmPwField.addEventListener("input", validatePasswordConfirm);
submitBtn.addEventListener("click", (e) => handleSubmit(e));
