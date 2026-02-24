const btn = document.querySelector("#submitBtn");
const output = document.querySelector("#output");

btn.addEventListener("click", async () =>{ 
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();

        if (!name || !email) {
            output.innerText = "Fill the form fist!!";
            return;
        }

        try{
            const response = await fetch('/submit', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email})
            });
            const data = await response.json();
            output.innerText = `Message: ${data.message}`;

        }catch(error){
            console.error("Error:", error);
            output.innerText = "Server error ❌";
        }
});
