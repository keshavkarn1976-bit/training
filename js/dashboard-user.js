document.addEventListener("DOMContentLoaded", async () => {
    const { user } = await window.protectRoute("user", "../");

    document.getElementById("welcome-name").textContent = user.displayName || user.email;

    const photo = document.getElementById("welcome-photo");
    if (user.photoURL) photo.src = user.photoURL;
});
