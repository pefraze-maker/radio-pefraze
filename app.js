const player = document.getElementById('player');
const status = document.getElementById('status');
const streamNote = document.getElementById('streamNote');
const installBtn = document.getElementById('installBtn');
document.getElementById('year').textContent = new Date().getFullYear();
const streamUrl = window.PEFRAZE_CONFIG?.streamUrl?.trim();
if (streamUrl) {
  player.src = streamUrl;
  streamNote.textContent = 'Si la transmisión no comienza, comprueba que el enlace de audio esté activo y sea compatible con tu navegador.';
  status.textContent = 'Transmisión disponible';
  player.addEventListener('playing', () => status.textContent = 'En vivo · Reproduciendo');
  player.addEventListener('waiting', () => status.textContent = 'Conectando con la emisora…');
  player.addEventListener('error', () => status.textContent = 'No se pudo cargar el audio. Usa el enlace de Zeno.');
} else {
  player.hidden = true;
}
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
let installPrompt;
window.addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); installPrompt = event; installBtn.classList.remove('hidden'); });
installBtn.addEventListener('click', async () => { if (!installPrompt) return; installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; installBtn.classList.add('hidden'); });
window.addEventListener('appinstalled', () => { installBtn.classList.add('hidden'); });
