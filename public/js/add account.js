document.querySelector ("#addaccount").addEventListener("submit",async function(event){
    event.preventDefault()
    const client_number=document.querySelector("#client_number").value
    const account_number=document.querySelector("#account_number").value
    const account_type=document.querySelector("#account_type").value
    const ownership_type=document.querySelector("#ownership_type").value
    const account_balance=document.querySelector("#account_balance").value
const response=await fetch("/api/accounts/",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({client_number,account_number,account_type,ownership_type,account_balance,})
})
if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
})