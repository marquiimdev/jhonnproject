module.exports = {
  name: 'botinfo',
  description: "Exibe informações do bot.",
  execute(message, args, client) {
    const { MessageEmbed } = require('discord.js');

    const embed = new MessageEmbed()
    .setAuthor(`Minhas informações, ${message.author.tag}`, message.author.avatarURL())
    .setDescription(`> Meu desenvolvedor: \`Marquiim#4528\`.\n> Fui desenvolvido em: \`NodeJS\`\n> Curta sua música.\n[Meu convite](https://discord.com/oauth2/authorize?client_id=852262912454033408&permissions=0&scope=bot)\né proibido tocar música ruim.`)
    .setColor("#2e3137");

    message.channel.send(embed);
  }
}
