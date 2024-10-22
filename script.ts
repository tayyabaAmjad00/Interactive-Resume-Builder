// Declare variable for html2pdf
declare var html2pdf: any;

// Handle form submission and display resume
document.getElementById('ResumeForm')?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;

    if (nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;

        // Create a URL for the profile picture
        const profilePicElement = document.getElementById('profilePic') as HTMLInputElement;
        const profilePicURL = profilePicElement.files && profilePicElement.files[0] 
            ? URL.createObjectURL(profilePicElement.files[0]) 
            : '';

        // Creating resume output
        const resumeOutput = `
            <div class="resume-content">
                <h2>Resume</h2>
                ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;"/>` : ''}
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>

                <h3>Education</h3>
                <p>${education}</p>

                <h3>Skills</h3>
                <p>${skills}</p>

                <h3>Work Experience</h3>
                <p>${experience}</p>
            </div>
        `;

        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
    }
});

// Handle PDF download
document.getElementById("downloadPDF")?.addEventListener("click", function() {
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeOutputElement).set(opt).save();
    } else {
        console.error("Resume content not found.");
    }
});

// Preview Profile Picture
document.getElementById('profilePic')?.addEventListener('change', function() {
    const profilePicElement = this as HTMLInputElement; // Cast 'this' to HTMLInputElement
    const profilePreview = document.getElementById('profilePreview') as HTMLImageElement;

    if (profilePicElement.files && profilePicElement.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (profilePreview) {
                profilePreview.src = e.target?.result as string;
                profilePreview.style.display = 'block'; // Show the image
            }
        };
        reader.readAsDataURL(profilePicElement.files[0]);
    }
});
