async function loadComponent(id, file, basePath = "") {
    const el = document.getElementById(id);
    if (!el) return;

    const response = await fetch(file);
    const html = await response.text();
    el.innerHTML = html.replaceAll("{{base}}", basePath);
}

async function initLayout(basePath = "") {
    await Promise.all([
        loadComponent("header", `${basePath}components/header.html`, basePath),
        loadComponent("footer", `${basePath}components/footer.html`, basePath)
    ]);

    if (window.initAuthUI) window.initAuthUI(basePath);
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

window.loadComponent = loadComponent;
window.initLayout = initLayout;
window.escapeHtml = escapeHtml;

document.addEventListener("DOMContentLoaded", () => {
    initLayout(document.body.dataset.base || "");
});
