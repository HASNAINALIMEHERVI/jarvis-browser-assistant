export function respond(input, now = new Date()) {
  const command = String(input).trim().replace(/^jarvis\b[ ,]*/i, '').trim();
  const lower = command.toLowerCase();
  if (!command) return { text: 'Type or say a command.' };
  if (command.length > 500) return { text: 'Use a command of 500 characters or fewer.' };
  if (['help', 'what can you do'].includes(lower)) return { text: 'Try time, date, joke, hello, or search followed by a topic. This demo has no access to your files or apps.' };
  if (/^(time|what time is it|tell me the time)[?]?$/.test(lower)) return { text: `The time is ${now.toLocaleTimeString()}.` };
  if (/^(date|what is the date|tell me the date)[?]?$/.test(lower)) return { text: `Today is ${now.toLocaleDateString()}.` };
  if (['hello','hi'].includes(lower)) return { text: 'Hello! I am a small browser assistant demo.' };
  if (['joke','tell a joke','tell me a joke'].includes(lower)) return { text: 'My computer asked for a break. I offered it a space bar.' };
  if (lower.startsWith('search ')) {
    const query = command.slice(7).trim();
    if (!query) return { text: 'Add a search topic.' };
    return { text: `Search prepared for: ${query}. Open the link when ready.`, link: `https://www.google.com/search?q=${encodeURIComponent(query)}` };
  }
  return { text: 'That command is not supported. Try help.' };
}
