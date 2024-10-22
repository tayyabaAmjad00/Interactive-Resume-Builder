var _a, _b, _c;
// Handle form submission and display resume
(_a = document.getElementById('ResumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var skillsElement = document.getElementById('skills');
    var experienceElement = document.getElementById('experience');
    if (nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var skills = skillsElement.value;
        var experience = experienceElement.value;
        // Create a URL for the profile picture
        var profilePicElement = document.getElementById('profilePic');
        var profilePicURL = profilePicElement.files && profilePicElement.files[0]
            ? URL.createObjectURL(profilePicElement.files[0])
            : '';
        // Creating resume output
        var resumeOutput = "\n            <div class=\"resume-content\">\n                <h2>Resume</h2>\n                ".concat(profilePicURL ? "<img src=\"".concat(profilePicURL, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\"/>") : '', "\n                <p><strong>Name:</strong> ").concat(name_1, "</p>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n\n                <h3>Work Experience</h3>\n                <p>").concat(experience, "</p>\n            </div>\n        ");
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
    }
});
// Handle PDF download
(_b = document.getElementById("downloadPDF")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        var opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeOutputElement).set(opt).save();
    }
    else {
        console.error("Resume content not found.");
    }
});
// Preview Profile Picture
(_c = document.getElementById('profilePic')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', function () {
    var profilePicElement = this; // Cast 'this' to HTMLInputElement
    var profilePreview = document.getElementById('profilePreview');
    if (profilePicElement.files && profilePicElement.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if (profilePreview) {
                profilePreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                profilePreview.style.display = 'block'; // Show the image
            }
        };
        reader.readAsDataURL(profilePicElement.files[0]);
    }
});
