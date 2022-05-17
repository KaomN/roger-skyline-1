function setFormMessage(formElement, type, message) {
	const messageElement = formElement.querySelector(".form_message");

	messageElement.textContent = message;
	messageElement.classList.remove ("form_message-success", "form_message-error");
	messageElement.classList.add(`form_message-${type}`);
}

function setInputError(inputElement, message) {
	inputElement.classList.add("form_input-error");
	inputElement.parentElement.querySelector(".input_error-message").textContent = message;
}

function clearInputError(inputElement) {
	inputElement.classList.remove("form_input-error");
	inputElement.parentElement.querySelector(".input_error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");

	document.querySelector("#linkCreateAccount").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.add("form-hidden");
		createAccountForm.classList.remove("form-hidden");
	});

	document.querySelector("#linkLogin").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.remove("form-hidden");
		createAccountForm.classList.add("form-hidden");
	});
});