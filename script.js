const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const matchError = document.getElementById('match-error');

// パスワードのリアルタイムバリデーション
password.addEventListener('input', () => {
    const val = password.value;
    
    // チェック項目
    document.getElementById('req-length').className = val.length >= 8 ? 'valid' : '';
    document.getElementById('req-upper').className = /[A-Z]/.test(val) ? 'valid' : '';
    document.getElementById('req-number').className = /[0-9]/.test(val) ? 'valid' : '';
    document.getElementById('req-symbol').className = /[!@#$%^&*]/.test(val) ? 'valid' : '';
    
    // ひらがな・カタカナ・全角が含まれているかチェック
    const hasJp = /[^\x20-\x7e]/.test(val); 
    document.getElementById('req-no-jp').className = (val.length > 0 && !hasJp) ? 'valid' : '';

    if(hasJp) {
        password.setCustomValidity("ひらがな・カタカナ・全角文字は使用できません。");
    } else {
        password.setCustomValidity("");
    }
});

// パスワード一致チェック
function checkMatch() {
    if (confirmPassword.value && password.value !== confirmPassword.value) {
        matchError.style.display = 'block';
    } else {
        matchError.style.display = 'none';
    }
}

confirmPassword.addEventListener('input', checkMatch);

// 2秒間表示機能（前回分）
const toggleBtn = document.getElementById('togglePassword');
toggleBtn.addEventListener('click', () => {
    if (password.type === 'text') return;
    password.type = 'text';
    toggleBtn.textContent = '表示中';
    setTimeout(() => {
        password.type = 'password';
        toggleBtn.textContent = '表示';
    }, 2000);
});

// Googleログイン（ボタンクリック時の動作）
document.getElementById('google-login').addEventListener('click', () => {
    alert("Googleログイン機能を有効にするには、Firebaseの設定が必要です。");
    // ここにFirebaseのsignInWithPopup(provider)などを記述します
});
