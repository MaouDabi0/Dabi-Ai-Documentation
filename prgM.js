const crackLoader = require('./toolkit/CrckMD.js');

module.exports = async function crackHandler(conn, m, text) {
  if (!text || !text.startsWith(global.isPrefix + '/')) return false;

  const rawText = text.slice((global.isPrefix + '/').length).trim();
  const regex = /^CrackMode\s*:\s*-r=\s*{\s*(.+?)\s*}$/i;
  const match = rawText.match(regex);

  if (!match) return false;

  const info = {
    chatId: m.chat,
    sender: m.sender,
    fromMe: m.key.fromMe
  };

  try {
    const handled = await crackLoader(conn, m, info, rawText, match);
    return handled;
  } catch (e) {
    console.error('[CRACK_HANDLER]', e);
    return false;
  }
};