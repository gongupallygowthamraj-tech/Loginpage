
/* =================================
   NEXORA JAVASCRIPT ENGINE
================================= */

// ELEMENTS

const body = document.body;

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const switchButton = document.getElementById("switchButton");

const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeDescription = document.getElementById("welcomeDescription");

const loginFeedback = document.getElementById("loginFeedback");
const signupFeedback = document.getElementById("signupFeedback");


// TEMPORARY USER DATABASE
// This is only for frontend learning.

const users = new Map();


// =================================
// 1. SWITCH LOGIN AND SIGNUP
// =================================

function showSignup() {

    loginForm.classList.remove("active");
    signupForm.classList.add("active");

    welcomeTitle.textContent = "Welcome Back!";

    welcomeDescription.textContent =
        "Already part of our world? Sign in and continue your extraordinary journey.";

    switchButton.textContent = "SIGN IN";

    clearMessages();
}


function showLogin() {

    signupForm.classList.remove("active");
    loginForm.classList.add("active");

    welcomeTitle.textContent = "Hello, Friend!";

    welcomeDescription.textContent =
        "Discover a world of possibilities. Create your account and experience something extraordinary.";

    switchButton.textContent = "CREATE ACCOUNT";

    clearMessages();
}


switchButton.addEventListener("click", function () {

    if (signupForm.classList.contains("active")) {
        showLogin();
    } else {
        showSignup();
    }

});


document.getElementById("mobileToSignup")
    .addEventListener("click", function(event) {

        event.preventDefault();
        showSignup();

    });


document.getElementById("mobileToLogin")
    .addEventListener("click", function(event) {

        event.preventDefault();
        showLogin();

    });


// =================================
// 2. CHANGE FIVE WEBSITE THEMES
// =================================

const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedTheme = button.dataset.theme;

        // Change theme
        body.dataset.theme = selectedTheme;

        // Update selected button
        themeButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});


// =================================
// 3. SHOW AND HIDE PASSWORD
// =================================

const eyeButtons = document.querySelectorAll(".eye-btn");

eyeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const inputId = button.dataset.target;

        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "HIDE";

        } else {

            passwordInput.type = "password";

            button.textContent = "SHOW";

        }

    });

});


// =================================
// 4. MESSAGE FUNCTION
// =================================

function showMessage(element, text, type) {

    element.textContent = text;

    element.className = "feedback " + type;

}


function clearMessages() {

    loginFeedback.textContent = "";
    signupFeedback.textContent = "";

    loginFeedback.className = "feedback";
    signupFeedback.className = "feedback";

}


// =================================
// 5. EMAIL VALIDATION
// =================================

function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


// =================================
// 6. CREATE NEW ACCOUNT
// =================================

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("signupName")
        .value.trim();

    const email = document.getElementById("signupEmail")
        .value.trim().toLowerCase();

    const password = document.getElementById("signupPassword")
        .value;

    const confirmPassword = document.getElementById("confirmPassword")
        .value;


    // CHECK NAME

    if (name.length < 2) {

        showMessage(
            signupFeedback,
            "Please enter your full name.",
            "error"
        );

        return;
    }


    // CHECK EMAIL

    if (!validEmail(email)) {

        showMessage(
            signupFeedback,
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    // CHECK PASSWORD

    if (password.length < 8) {

        showMessage(
            signupFeedback,
            "Password must contain at least 8 characters.",
            "error"
        );

        return;
    }


    // CHECK CONFIRM PASSWORD

    if (password !== confirmPassword) {

        showMessage(
            signupFeedback,
            "Passwords do not match!",
            "error"
        );

        return;
    }


    // CHECK EXISTING USER

    if (users.has(email)) {

        showMessage(
            signupFeedback,
            "This email is already registered.",
            "error"
        );

        return;
    }


    // CREATE ACCOUNT

    users.set(email, {
        name: name,
        password: password
    });


    showMessage(
        signupFeedback,
        "Account created successfully!",
        "success"
    );


    // SWITCH TO LOGIN

    setTimeout(function() {

        document.getElementById("loginEmail").value = email;

        signupForm.reset();

        showLogin();

        showMessage(
            loginFeedback,
            "Welcome " + name + "! Please sign in.",
            "success"
        );

    }, 1200);

});


// =================================
// 7. SIGN IN
// =================================

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail")
        .value.trim().toLowerCase();

    const password = document.getElementById("loginPassword")
        .value;


    // CHECK EMAIL

    if (!validEmail(email)) {

        showMessage(
            loginFeedback,
            "Please enter a valid email.",
            "error"
        );

        return;
    }


    // CHECK ACCOUNT

    if (!users.has(email)) {

        showMessage(
            loginFeedback,
            "Account not found. Please create an account.",
            "error"
        );

        return;
    }


    // GET USER

    const user = users.get(email);


    // CHECK PASSWORD

    if (user.password !== password) {

        showMessage(
            loginFeedback,
            "Incorrect password. Please try again.",
            "error"
        );

        return;
    }


    // SUCCESS

    showMessage(
        loginFeedback,
        "Welcome " + user.name + "! Login successful.",
        "success"
    );

});


// =================================
// 8. FORGOT PASSWORD DEMO
// =================================

document.getElementById("forgotPassword")
    .addEventListener("click", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail")
            .value.trim().toLowerCase();

        if (!validEmail(email)) {

            showMessage(
                loginFeedback,
                "Enter your email address first.",
                "error"
            );

            return;
        }

        showMessage(
            loginFeedback,
            "Password recovery needs a backend and email service.",
            "error"
        );

    });


// =================================
// WEBSITE INITIALIZATION
// =================================

showLogin();

console.log("NEXORA website initialized successfully!");
