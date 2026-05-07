if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function () {});
}
window.__pwaPromptEvent = null;
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  window.__pwaPromptEvent = e;
  window.dispatchEvent(new Event('pwa-ready'));
});
