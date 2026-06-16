// auth-check-include.js
import { checkAuthentication } from './auth-check.js';

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication()
        .then((result) => {
            if (!result && window.location.pathname !== "/login.html" && window.location.pathname !== "/logoutnow.html") {
                const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = `login.html?returnUrl=${redirectUrl}`;
            }
        })
        .catch((error) => {
            console.error("Authentication check failed:", error);
            alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        });
});