const searchFormHandler = async (event) => {
    event.preventDefault();

    const clientNumber = document.getElementById('client-number').value.trim();
    // const accountNumber = document.getElementById('account-number').value.trim();

    if (clientNumber) {
        const response = await fetch(`/api/clients/${clientNumber}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        document.location.replace(`/clientProfile/${clientNumber}`);
      } else {
        alert(response.statusText);
      }
};
};

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);