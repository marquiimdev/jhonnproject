module.exports = {
  name: 'guildCreate',
  execute(guild) {
    (async () => {
      const db = require('../struct/db');
      const result = await db.insertGuild({id: guild.id, prefixo: "j!" });
    })();
  }
};
