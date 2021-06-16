module.exports = {
  name: 'config',
  description: "Comando para gerir as configurações do servidor.",
  async execute(message, args) {
    const embed = require("../struct/simpleEmbed");

    if (!message.member.permissions.has("ADMINISTRATOR")) return embed.send("<:nope:758755720593932318>| Você precisa da permissão de `ADMINISTRADOR` para executar esse comando.", message.channel);
    const db = require("../struct/db");
    let result = await db.getPrefix({id: message.guild.id});
    let prefixo = result[0].prefixo;

    if (!args[0]) return embed.send(`<:aviso:766066082187444225>| Configurações disponíveis: \`prefixo\`, use \`${prefixo}config [configuração]\`.`, message.channel)

    if (args[0].toLowerCase().includes('prefixo')) {
      if (!args[1]) return embed.send("<:aviso:766066082187444225>| Insira um prefixo válido.", message.channel);

      await db.changePrefix({id: message.guild.id, prefixo: args[1]});
      embed.send(`<:ok:758755391491407873>| Prefixo alterado para **${args[1]}**`, message.channel);
    }
  }
};
