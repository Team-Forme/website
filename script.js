// ロード開始時刻を取得
const loadingStart = Date.now();

window.addEventListener('load', function(){
  const elapsed = Date.now() - loadingStart;
  const minTime = 3000; // 3秒（3000ミリ秒）

  if (elapsed < minTime) {
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
    }, minTime - elapsed);
  } else {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  }
});
