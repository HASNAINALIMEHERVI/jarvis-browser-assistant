import { respond } from './commands.mjs';
const field = document.getElementById('command');
const response = document.getElementById('response');
const status = document.getElementById('status');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const read = document.getElementById('speak');
const link = document.getElementById('searchLink');
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
const recognition = Recognition ? new Recognition() : null;
let listening = false;
function showCommand(command) {
  const result = respond(command);
  response.textContent = result.text;
  link.hidden = !result.link;
  if (result.link) link.href = result.link; else link.removeAttribute('href');
}
function stopAll() {
  listening = false;
  if (recognition) recognition.abort();
  if (speechSupported) window.speechSynthesis.cancel();
  start.disabled = !recognition;
  status.textContent = recognition ? 'Microphone is off.' : 'Voice recognition is unavailable. Typed commands still work.';
}
document.getElementById('commandForm').addEventListener('submit', event => { event.preventDefault(); showCommand(field.value); });
read.disabled = !speechSupported;
read.addEventListener('click', () => {
  if (!speechSupported) return;
  if (recognition && listening) stopAll();
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(response.textContent));
});
stop.addEventListener('click', stopAll);
if (recognition) {
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  start.addEventListener('click', () => {
    if (listening) return;
    try {
      if (speechSupported) window.speechSynthesis.cancel();
      recognition.start(); listening = true; start.disabled = true;
      status.textContent = 'Listening for one command…';
    } catch { listening = false; start.disabled = false; status.textContent = 'Could not start the microphone. Try typed commands.'; }
  });
  recognition.onresult = event => {
    if (!listening) return;
    const text = event.results[event.resultIndex][0].transcript;
    field.value = text.slice(0,500); showCommand(field.value);
  };
  recognition.onerror = event => {
    listening = false; start.disabled = false;
    status.textContent = event.error === 'not-allowed' ? 'Microphone permission was denied. Typed commands still work.' : `Voice recognition ended (${event.error}). Try again or type a command.`;
  };
  recognition.onend = () => { listening = false; start.disabled = false; if (!status.textContent.includes('denied') && !status.textContent.includes('ended')) status.textContent = 'Microphone is off.'; };
} else { start.disabled = true; status.textContent = 'Voice recognition is unavailable. Typed commands still work.'; }
