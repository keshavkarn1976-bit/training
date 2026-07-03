document.addEventListener("DOMContentLoaded", async () => {
    const { user } = await window.protectRoute("admin", "../");

    document.getElementById("welcome-name").textContent = user.displayName || user.email;

    const users = await window.firebaseAuth.getAllUsers();
    const tbody = document.getElementById("users-table-body");

    tbody.innerHTML = users.map(u => `
        <tr class="border-b border-outline-variant last:border-b-0">
            <td class="py-3 px-4 font-body-md text-body-md text-on-surface">${escapeHtml(u.displayName || "")}</td>
            <td class="py-3 px-4 font-body-md text-body-md text-on-surface-variant">${escapeHtml(u.email || "")}</td>
            <td class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase">${escapeHtml(u.role || "")}</td>
        </tr>
    `).join("");
});
