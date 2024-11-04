document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
  
        // Gather form data
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('education', document.getElementById('education').value);
        formData.append('experience', document.getElementById('experience').value);
        formData.append('position', document.getElementById('position').value);
        formData.append('resume', document.getElementById('resume').files[0]); // Get the uploaded file

        // Log form data for debugging
        console.log("Form Data Submitted:", {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            education: document.getElementById('education').value,
            experience: document.getElementById('experience').value,
            position: document.getElementById('position').value,
            resume: document.getElementById('resume').files[0] ? document.getElementById('resume').files[0].name : 'No file uploaded'
        });
  
        // Sending data to the server
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: formData // Use FormData to handle file uploads
        })
        .then(response => {
            if (!response.ok) { // Check if the response is not OK
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Handle the response from the server
            alert('Submission successful: ' + data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form: ' + error.message); // Alert user of error
        });
    });
});
