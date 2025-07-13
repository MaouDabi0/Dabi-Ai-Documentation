module.exports = {
  name: 'spamadmin',
  command: ['spamadmin', 'spam'],
  tags: 'Group Tools',
  desc: 'Spam admin: Naik-turun jabatan admin target beberapa kali',
  prefix: true,
  owner: false,
  premium: false,

  run: async (conn, msg, {
    chatInfo,
    prefix,
    commandText,
    args
  }) => {
    const { chatId, senderId, isGroup } = chatInfo;

    if (!(await isOwner(module.exports, conn, msg))) return;
    if (!(await isPrem(module.exports, conn, msg))) return;

    try {
      if (!isGroup) {
        return conn.sendMessage(chatId, { text: '❌ Perintah ini hanya bisa digunakan dalam grup!' }, { quoted: msg });
      }

      const { botAdmin, userAdmin } = await stGrup(conn, chatId, senderId);
      if (!userAdmin) {
        return conn.sendMessage(chatId, { text: '❌ Kamu bukan admin grup.' }, { quoted: msg });
      }
      if (!botAdmin) {
        return conn.sendMessage(chatId, { text: '❌ Bot bukan admin grup.' }, { quoted: msg });
      }

      const mentionTarget = msg.mentionedJid?.[0];
      const quotedSender = msg.message?.extendedTextMessage?.contextInfo?.participant;
      const targetUser = quotedSender || mentionTarget;

      let loopCount;
      if (quotedSender) {
        loopCount = parseInt(args[0]);
      } else if (mentionTarget) {
        loopCount = parseInt(args[1] || args[0]);
      }

      if (!targetUser || isNaN(loopCount) || loopCount < 1) {
        return conn.sendMessage(chatId, {
          text: `❌ Gunakan format:\n• Balas pesan target + jumlah\n• ${prefix}${commandText} @tag 5`
        }, { quoted: msg });
      }

      const groupMetadata = await mtData(chatId, conn);
      if (!groupMetadata) {
        return conn.sendMessage(chatId, { text: '❌ Gagal mengambil data grup.' }, { quoted: msg });
      }

      const participant = groupMetadata.participants.find(p => p.id === targetUser);
      if (!participant) {
        return conn.sendMessage(chatId, { text: '❌ Target tidak ditemukan dalam grup.' }, { quoted: msg });
      }

      if (participant.admin === 'superadmin') {
        return conn.sendMessage(chatId, { text: '❌ Tidak bisa mengubah status pemilik grup.' }, { quoted: msg });
      }

      for (let i = 0; i < loopCount; i++) {
        await conn.groupParticipantsUpdate(chatId, [targetUser], 'promote').catch(() => {});
        await new Promise(resolve => setTimeout(resolve, 1500));
        await conn.groupParticipantsUpdate(chatId, [targetUser], 'demote').catch(() => {});
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      return conn.sendMessage(chatId, {
        text: `✅ Selesai spam admin ke @${targetUser.split('@')[0]} sebanyak ${loopCount} kali.`,
        mentions: [targetUser]
      }, { quoted: msg });

    } catch (err) {
      console.error(err);
      return conn.sendMessage(chatId, {
        text: '❌ Terjadi kesalahan saat mencoba spam admin.'
      }, { quoted: msg });
    }
  }
};