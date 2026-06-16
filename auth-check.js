import { auth, signOut } from './firebase-config.js';

export function checkAuthentication() {
    console.log("checkAuthentication başladı, mevcut sayfa:", window.location.pathname);

    if (window.location.pathname === "/login.html" || window.location.pathname === "/logoutnow.html") {
        console.log("Login veya logout sayfasında, kontrol atlanıyor.");
        return Promise.resolve(null);
    }

    return new Promise((resolve) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        console.log("localStorage isLoggedIn:", isLoggedIn);

        if (isLoggedIn) {
            console.log("Kullanıcı login olmuş, oturum tanındı.");
            const returnUrl = sessionStorage.getItem("returnUrl");
            if (returnUrl && returnUrl !== window.location.pathname) {
                console.log("returnUrl mevcut ve farklı, yönlendiriliyor:", returnUrl);
                sessionStorage.removeItem("returnUrl");
                window.location.href = returnUrl;
            } else {
                console.log("returnUrl yok veya zaten doğru sayfadayız.");
            }
            resolve({ loggedIn: true }); // Basit bir obje dönüyoruz
        } else {
            console.log("Kullanıcı login olmamış, login’e yönlendiriliyor.");
            const redirectUrl = window.location.pathname + window.location.search;
            sessionStorage.setItem("returnUrl", redirectUrl);
            window.location.href = "/login.html";
            resolve(null);
        }
    });
}

export async function handleLogout() {
    try {
        console.log("Çıkış yapılıyor...");
        await signOut(auth);
        localStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("returnUrl");
        window.location.href = "/login.html";
        console.log("Çıkış başarılı.");
    } catch (error) {
        console.error("Çıkış hatası:", error);
        alert("Çıkış yaparken bir hata oluştu.");
    }
}