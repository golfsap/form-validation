const emailField = document.getElementById("email-field");
const emailErrorField = document.getElementById("email-error");
const countryField = document.getElementById("country-field");
const countryErrorField = document.getElementById("country-error");

const validateEmail = (e) => {
  if (emailField.checkValidity()) {
    emailField.setCustomValidity("");
    // emailErrorField.classList.add("no-error");
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

const styleNoError = (input) => {
  const msgDiv = document.getElementById(`${input}-error`);
  msgDiv.classList.add("no-error");
  msgDiv.textContent = "✅ Nice!";
  console.log(msgDiv);
};

// Event Listener
emailField.addEventListener("input", validateEmail);
countryField.addEventListener("input", validateCountry);
