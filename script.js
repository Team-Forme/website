// 要素を確実に取得
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const meterBar = document.getElementById('meter-bar');
const matchError = document.getElementById('match-error');
const toggleBtn = document.getElementById('togglePassword');

// パスワードリアルタイムチェック
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    
    // バリデーション条件
    const checks = {
        'req-length': val.length >= 8,
        'req-upper': /[A-Z]/.test(val),
        'req-number': /[0-9]/.test(val),
        'req-symbol': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
    };

    let passedCount = 0;

    // 各ヒントのクラスを切り替え
    Object.keys(checks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (checks[id]) {
                element.classList.add('valid');
                passedCount++;
            } else {
                element.classList.remove('valid');
            }
        }
    });

    // 強度メーターの更新
    const progress = (passedCount / 4) * 100;
    meterBar.style.width = progress + '%';
    
    // 全条件クリアで色を緑に
    meterBar.style.backgroundColor = (passedCount === 4) ? '#10b981' : '#0067C0';

    // 全角入力禁止設定
    if(/[^\x20-\x7e]/.test(val)) {
        passwordInput.setCustomValidity("パスワードは半角英数字・記号のみです");
    } else {
        passwordInput.setCustomValidity("");
    }
});

// パスワード一致チェック
confirmInput.addEventListener('input', () => {
    if (passwordInput.value === confirmInput.value) {
        matchError.style.display = 'none';
    } else {
        matchError.style.display = 'block';
    }
});

// 表示ボタン（2秒間表示）
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '表示中';
        
        setTimeout(() => {
            passwordInput.type = 'password';
            toggleBtn.textContent = '表示';
        }, 2000);
    }
});

// 初期フォーカス
window.onload = () => {
    const emailField = document.getElementById('email');
    if(emailField) emailField.focus();
};
