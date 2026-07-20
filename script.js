/**
 * @fileauth Authentication Manager
 * @description Mengelola proses login, logout, dan proteksi halaman di sisi klien.
 */

const AuthManager = (() => {
    // Konfigurasi Kredensial (Sifatnya privat, tidak bisa diakses via konsol browser)
    const CREDENTIALS = {
        username: "admin",
        password: "ugibutu47"
    };

    // Kunci Penyimpanan Halaman
    const STORAGE_KEY = "isLoggedIn";
    const PAGE_LOGIN = "login.html";
    const PAGE_DASHBOARD = "dashboard.htm";

    /**
     * Memeriksa apakah input teks kosong atau hanya berisi spasi
     * @param {string} value
     * @returns {boolean}
     */
    const isEmpty = (value) => !value || value.trim() === "";

    return {
        /**
         * Memproses validasi login pengguna
         */
        checkLogin: function() {
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");

            if (!usernameInput || !passwordInput) {
                console.error("Elemen input tidak ditemukan di DOM.");
                return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // 1. Validasi Input Kosong
            if (isEmpty(username) || isEmpty(password)) {
                alert("Username dan Password tidak boleh kosong!");
                return;
            }

            // 2. Validasi Kredensial
            if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
                localStorage.setItem(STORAGE_KEY, "true");
                window.location.href = PAGE_DASHBOARD;
            } else {
                alert("Username atau Password salah!");
                passwordInput.value = ""; // Reset field password demi keamanan
                passwordInput.focus();
            }
        },

        /**
         * Menghapus sesi aktif dan kembali ke halaman login
         */
        logout: function() {
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = PAGE_LOGIN;
        },

        /**
         * Memeriksa status otentikasi (Digunakan di halaman dashboard)
         */
        protectDashboard: function() {
            const isDashboard = window.location.pathname.includes(PAGE_DASHBOARD);
            const isAuthenticated = localStorage.getItem(STORAGE_KEY) === "true";

            if (isDashboard && !isAuthenticated) {
                alert("Akses ditolak! Silakan login terlebih dahulu.");
                window.location.href = PAGE_LOGIN;
            }
        }
    };
})();

// Jalankan proteksi halaman secara otomatis saat skrip dimuat
document.addEventListener("DOMContentLoaded", () => {
    AuthManager.protectDashboard();
});
