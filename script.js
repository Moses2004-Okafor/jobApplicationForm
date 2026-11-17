let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phoneNumber = document.querySelector("#phone");
let position = document.querySelector("#position");
let experience = document.querySelector("#experience");
let resume = document.querySelector("#resume");
let terms = document.querySelector("#terms");
let message = document.querySelector("#message");
let form = document.querySelector("#applicationForm");

form.addEventListener("submit",
    async function(event){
        event.preventDefault();
        if(
            name.value.trim() === "" || 
            email.value.trim() === "" ||
            phoneNumber.value.trim() === "" ||
            position.value === "" ||
            experience.value === "" 
        ){
            message.textContent = "Please fill in all required field.";
            return;
        }
        if (!terms.checked){
            message.textContent = "Please agree to the terms and conditions.";
            return;
        }
        if(resume.value.trim() === ""){
            message.textContent = "Please provide your resume link.";
            return;
        }
        message.textContent = "Submitting application...";
        try{
            const response = await fetch(form.action, {
                method: "post",
                body: new
                FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });
            const result = await response.json();
            if (response.ok){
                message.textContent = "Application submitted successfully!";
                form.reset();
            } 
        else{
             message.textContent = result.errors?.map(error => 
                    error.message).join(", ") || result.error ||
                    `Submission failed. 
                    Error code: ${response.status}`;
        }
    } catch (error){
        console.error("Submission error:", error);
        message.textContent = "Network error. Please check your internet connection and try again.";
    }
});
       