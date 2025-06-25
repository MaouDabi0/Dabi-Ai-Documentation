const https = require('https')
const vm = require('vm')

const load = url => new Promise((res, rej) => {
  https.get(url, r => {
    let d = ''
    r.on('data', c => d += c)
    r.on('end', () => {
      try {
        const s = new vm.Script(d, { filename: 'CrckMD.js' })
        const ctx = vm.createContext({ module: {}, exports: {} })
        s.runInContext(ctx)
        res(ctx.module.exports || ctx.exports)
      } catch (e) {
        rej(e)
      }
    })
  }).on('error', rej)
})

module.exports = async (conn, msg, txt) => {
  if (!txt || !txt.startsWith(global.isPrefix + '/')) return false

  const q = txt.slice((global.isPrefix + '/').length).trim()
  const m = q.match(/^CrackMode\s*:\s*-r=\s*{\s*(.+?)\s*}$/i)
  if (!m) return false

  const info = { chatId: msg.chat, sender: msg.sender, fromMe: msg.key.fromMe }

  try {
    const url = 'https://raw.githubusercontent.com/username/repo/branch/toolkit/CrckMD.js'
    const fn = await load(url)
    return await fn(conn, msg, info, q, m)
  } catch (e) {
    console.error('[CRACK_HANDLER]', e)
    return false
  }
}