const password = document.getElementById('password');
const meterBar = document.getElementById('meter-bar');
const confirmPassword = document.getElementById('confirm-password');
const matchError = document.getElementById('match-error');

password.addEventListener('input', () => {
    const val = password.value;
    let strength = 0;

    // バリデーションチェック & メーター計算
    const checks = {
        'req-length': val.length >= 8,
        'req-upper': /[A-Z]/.test(val),
        'req-number': /[0-9]/.test(val),
        'req-symbol': /[!@#$%^&*]/.test(val)
    };

    Object.keys(checks).forEach(id => {
        const isValid = checks[id];
        document.getElementById(id).classList.toggle('valid', isValid);
        if(isValid) strength += 25;
    });

    // 日本語（全角）チェック
    if(/[^\x20-\x7e]/.test(val)) {
        password.setCustomValidity("No Japanese characters allowed");
        strength = 0;
    } else {
        password.setCustomValidity("");
    }

    // メーターの更新
    meterBar.style.width = strength + '%';
    meterBar.style.backgroundColor = strength === 100 ? '#10b981' : '#0067C0';
});

// パスワード一致チェック
confirmPassword.addEventListener('input', () => {
    const isMatch = password.value === confirmPassword.value;
    matchError.style.display = isMatch ? 'none' : 'block';
});

// 表示切り替え（2秒間）
document.getElementById('togglePassword').addEventListener('click', function() {
    password.type = 'text';
    this.textContent = 'Showing...';
    setTimeout(() => {
        password.type = 'password';
        this.textContent = 'Show';
    }, 2000);
});

const password = document.getElementById('password');
const meterBar = document.getElementById('meter-bar');
const successIcon = document.getElementById('pass-success-icon');

password.addEventListener('input', () => {
    const val = password.value;
    
    // バリデーション条件（記号の判定をより確実に）
    const checks = {
        'req-length': val.length >= 8,
        'req-upper': /[A-Z]/.test(val),
        'req-number': /[0-9]/.test(val),
        'req-symbol': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val) // 記号範囲を拡大
    };

    let passedCount = 0;
    Object.keys(checks).forEach(id => {
        const isValid = checks[id];
        document.getElementById(id).classList.toggle('valid', isValid);
        if(isValid) passedCount++;
    });

    // チェックマークの付与に関するロジック
    // メーターの更新
    const strength = (passedCount / 4) * 100;
    meterBar.style.width = strength + '%';
    
    if (strength === 100 && !/[^\x20-\x7e]/.test(val)) {
        // 全条件クリア（かつ日本語なし）の時だけチェックを表示
        meterBar.style.backgroundColor = '#10b981';
        successIcon.style.display = 'block';
    } else {
        meterBar.style.backgroundColor = '#0067C0';
        successIcon.style.display = 'none';
    }
});

const registrationForm = document.getElementById('registration-form');
const toastContainer = document.getElementById('toast-container');

// トーストを表示する共通関数
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `⚠️ <span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    // 3秒後に要素を削除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// フォーム送信時のバリデーション
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 実際の送信を止めてチェック

    const email = document.getElementById('email').value;
    const pass = password.value;
    const confirmPass = confirmPassword.value;

    // 1. 未入力チェック
    if (!email || !pass || !confirmPass) {
        showToast("すべての項目を入力してください");
        return;
    }

    // 2. パスワード一致チェック
    if (pass !== confirmPass) {
        showToast("パスワードが一致していません");
        return;
    }

    // 3. パスワード強度チェック（すべてのヒントが valid か）
    const allValid = document.querySelectorAll('.hints li.valid').length === 4;
    if (!allValid) {
        showToast("パスワードの条件をすべて満たしてください");
        return;
    }

    // すべてOKなら
    alert("登録が完了しました"); 
    // ここで実際のサーバー送信処理などを書きます
});
