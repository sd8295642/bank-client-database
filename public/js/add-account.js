const createNewAccount = async (event) => {
  event.preventDefault()

  const client_number = document.getElementById("client_number").value
  const account_number = document.getElementById("account_number").value
  const account_type = document.getElementById("account_type").value
  const ownership_type = document.getElementById("ownership_type").value
  const account_balance = document.getElementById("account_balance").value

  const response = await fetch("/api/accounts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_number, account_number, account_type, ownership_type, account_balance })
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
    .querySelector("#new-account")
    .addEventListener("submit", createNewAccount); 
