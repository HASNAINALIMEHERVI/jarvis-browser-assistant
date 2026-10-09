# Jarvis Browser Assistant

A personal browser speech/command demo expanded from Hasnain Ali Mehervi's supplied `jarvis.html`.

Open `index.html` in a modern browser or serve the folder using `python -m http.server 8080`. Type a command such as `time`, `date`, `joke`, `help` or `search responsive websites`. Optional voice input requires browser support and your microphone permission, requested only when you click Start microphone.

This is a browser demonstration, not an AI model or a Windows desktop assistant. It cannot open local applications, read laptop files or automate accounts. Search commands prepare a link for the user to click rather than automatically opening tabs. No backend or account is included.

The rewritten controller handles unsupported speech APIs, microphone errors and terminal recognition events. Stop aborts recognition and cancels speech. Recognition does not automatically restart after Stop. Browser speech recognition may send audio to a browser/provider service, so do not dictate private information. Availability depends on the browser and operating system.

Run `node --test tests/commands.test.mjs` to verify typed-command routing, literal search encoding and unsupported-command behavior. Microphone/voice hardware operation and visual browser QA have not been tested here.
