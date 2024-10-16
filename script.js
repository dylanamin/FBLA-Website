// Log the job form submission
document.getElementById('jobForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const jobTitle = document.getElementById('jobTitle').value;
  const jobDescription = document.getElementById('jobDescription').value;

  console.log(`Job Title: ${jobTitle}`);
  console.log(`Job Description: ${jobDescription}`);

  // Clear form
  this.reset();
  alert('Job submitted!');
});

// Log the application form submission
document.getElementById('applicationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const applicantName = document.getElementById('applicantName').value;
  const jobApplication = document.getElementById('jobApplication').value;

  console.log(`Applicant Name: ${applicantName}`);
  console.log(`Job Applied For: ${jobApplication}`);

  // Clear form
  this.reset();
  alert('Application submitted!');
});
