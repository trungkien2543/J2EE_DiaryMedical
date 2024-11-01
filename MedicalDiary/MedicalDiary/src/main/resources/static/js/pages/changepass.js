function handleChangePassword() {
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const errorMessageDiv = document.getElementById("error-message");
    const successMessageDiv = document.getElementById("success-message");

    // Clear previous messages
    errorMessageDiv.textContent = "";
    successMessageDiv.textContent = "";

    // Check if new password and confirm password match
    if (newPassword.value !== confirmPassword.value) {
        errorMessageDiv.textContent = "New password and confirm password do not match.";
        return;
    }

    // Send AJAX request to the server
    fetch('/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldPassword: currentPassword.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successMessageDiv.textContent = "Change successful";

                // Clear input fields
                currentPassword.value = "";
                newPassword.value = "";
                confirmPassword.value = "";

                // Optional redirect after success
                // window.location.href = "/change-password";
            } else {
                errorMessageDiv.textContent = data.message; // Display error message from server
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessageDiv.textContent = "An error occurred while changing password.";
        });
}
