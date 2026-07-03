import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const ADMIN_EMAIL = "keshav.karn@gmail.com";

const app = initializeApp(window.APP_CONFIG.firebase);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

async function ensureUserDoc(user) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: user.email === ADMIN_EMAIL ? "admin" : "user",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
        });
    } else {
        await updateDoc(userRef, { lastLogin: serverTimestamp() });
    }
}

async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserDoc(result.user);
    return result.user;
}

async function signOutUser() {
    await signOut(auth);
}

async function getUserRole(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data().role : null;
}

async function getAllUsers() {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

window.firebaseAuth = {
    auth,
    signInWithGoogle,
    signOutUser,
    getUserRole,
    getAllUsers,
    onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};
