module.exports = {
  name: 'guildDelete',
  execute(guild) {
    (async () => {
      const db = require('../struct/db');
      const result = await db.deleteGuild({id: guild.id});
    })();
  }
};
