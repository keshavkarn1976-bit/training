function renderSignedOut(authArea) {
    authArea.innerHTML = `
        <button id="signInBtn" class="bg-primary text-on-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all">Sign In</button>
    `;
    document.getElementById("signInBtn").addEventListener("click", () => {
        window.firebaseAuth.signInWithGoogle().catch((err) => console.error("Sign-in failed:", err));
    });
}

function renderSignedIn(authArea, user, dashboardHref) {
    authArea.innerHTML = `
        <div class="flex items-center gap-3">
            <a class="flex items-center gap-2" href="${dashboardHref}">
                <img class="w-8 h-8 rounded-full" src="${escapeHtml(user.photoURL || "")}" alt="">
                <span class="hidden sm:inline font-label-md text-label-md text-on-surface">${escapeHtml(user.displayName || user.email)}</span>
            </a>
            <button id="signOutBtn" class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Sign out</button>
        </div>
    `;
    document.getElementById("signOutBtn").addEventListener("click", () => {
        window.firebaseAuth.signOutUser();
    });
}

function initAuthUI(basePath = "") {
    const authArea = document.getElementById("auth-area");
    if (!authArea) return;

    window.firebaseAuth.onAuthStateChanged(async (user) => {
        if (!user) {
            renderSignedOut(authArea);
            return;
        }

        const role = await window.firebaseAuth.getUserRole(user.uid);
        const dashboardHref = `${basePath}pages/dashboard-${role === "admin" ? "admin" : "user"}.html`;
        renderSignedIn(authArea, user, dashboardHref);
    });
}

function protectRoute(requiredRole, basePath = "") {
    return new Promise((resolve) => {
        window.firebaseAuth.onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = `${basePath}index.html`;
                return;
            }

            const role = await window.firebaseAuth.getUserRole(user.uid);
            if (requiredRole === "admin" && role !== "admin") {
                window.location.href = `${basePath}pages/dashboard-user.html`;
                return;
            }

            resolve({ user, role });
        });
    });
}

window.initAuthUI = initAuthUI;
window.protectRoute = protectRoute;
