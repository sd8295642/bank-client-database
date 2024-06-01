const createNewClient = async (event) => {
    event.preventDefault()
    
    const client_number = document.getElementById("client_number").value
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const tax_id = document.getElementById("tax_id").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
  
    const response = await fetch("/api/clients/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_number, first_name, last_name, tax_id, phone, email, address })
    })
    
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      document.location.replace(`/clientProfile/${client_number}`)
      
    } else {
      const errorText = await response.text();
      alert('Request failed with status ' + response.status + ': ' + errorText);
    }
  }

  document
    .getElementById("new-client")
    .addEventListener("submit", createNewClient); 



  