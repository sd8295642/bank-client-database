const searchFormHandler = async (event) => {
    event.preventDefault();

    const clientNumber = document.querySelector('client-number').value.trim();
    const accountNumber = document.querySelector('account-number').value.trim();

    if (clientNumber || accountNumber) {
        const response = await fetch("/api/clientRoutes", {
            method: "POST",
            body: JSON.stringify({ clientNumber, accountNumber }),
            headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
};
};