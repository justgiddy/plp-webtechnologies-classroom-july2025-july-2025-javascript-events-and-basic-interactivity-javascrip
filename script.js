// Part 1: Event Handling and Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  initializeThemeToggle();
  initializeTabs();
  initializeAccordion();
  initializeFormValidation();
});

// Theme Toggle Implementation
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "light" : "dark";
    themeToggle.textContent =
      document.body.dataset.theme === "dark" ? "☀️ Light Mode" : "🌓 Dark Mode";
  });
}

// Part 2: Interactive Elements

// Tabs Implementation
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.dataset.tab;
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Accordion Implementation
function initializeAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains("active");

      // Close all accordion items
      accordionHeaders.forEach((h) => {
        h.classList.remove("active");
        h.nextElementSibling.classList.remove("active");
      });

      // If clicked item wasn't open, open it
      if (!isOpen) {
        header.classList.add("active");
        content.classList.add("active");
      }
    });
  });
}

// Part 3: Form Validation
function initializeFormValidation() {
  const form = document.getElementById("registrationForm");

  // Validation rules using regular expressions
  const validationRules = {
    username: {
      pattern: /^[a-zA-Z0-9_]{3,20}$/,
      message:
        "Username must be 3-20 characters and contain only letters, numbers, and underscores",
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        "Password must be at least 8 characters and include letters, numbers, and special characters",
    },
    phone: {
      pattern: /^\+?\d{10,15}$/,
      message: "Please enter a valid phone number (10-15 digits)",
    },
  };

  // Real-time validation for each input
  Object.keys(validationRules).forEach((field) => {
    const input = document.getElementById(field);
    if (input) {
      input.addEventListener("input", () => validateField(field));
    }
  });

  // Password confirmation validation
  const confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword) {
    confirmPassword.addEventListener("input", validatePasswordMatch);
  }

  // Form submission handling
  form.addEventListener("submit", handleSubmit);
}

// Validate individual field
function validateField(fieldName) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);
  const rule = validationRules[fieldName];

  if (!input || !errorElement || !rule) return;

  let isValid = true;
  let errorMessage = "";

  if (input.value.trim() === "") {
    isValid = false;
    errorMessage = `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required`;
  } else if (!rule.pattern.test(input.value)) {
    isValid = false;
    errorMessage = rule.message;
  }

  // Phone is optional, so clear error if empty
  if (fieldName === "phone" && input.value.trim() === "") {
    isValid = true;
    errorMessage = "";
  }

  input.classList.toggle("invalid", !isValid);
  errorElement.textContent = errorMessage;

  return isValid;
}

// Validate password match
function validatePasswordMatch() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const errorElement = document.getElementById("confirmPassword-error");

  const isMatch = password.value === confirmPassword.value;
  confirmPassword.classList.toggle("invalid", !isMatch);
  errorElement.textContent = !isMatch ? "Passwords do not match" : "";

  return isMatch;
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Validate all fields
  const fields = ["username", "email", "password"];
  const isValid = fields.every(validateField) && validatePasswordMatch();

  // Check terms agreement
  const terms = document.getElementById("terms");
  const termsError = document.getElementById("terms-error");
  if (!terms.checked) {
    termsError.textContent = "You must agree to the Terms and Conditions";
    return;
  } else {
    termsError.textContent = "";
  }

  if (isValid) {
    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent =
      "Registration successful! Thank you for signing up.";

    const form = event.target;
    form.reset();
    form.appendChild(successMessage);

    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
}
