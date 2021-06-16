module.exports = {
  name: 'ping',
  description: 'Exibe a latência do bot.',
  cooldown: 3,
  execute(message) {
    const { MessageEmbed } = require("discord.js");

    message.channel.send("Carregando...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;

            const embed = new MessageEmbed()
            .setDescription(`<a:carregando:753646729500426382>| Latência de: \`${ping}ms\`.`)
            .setColor("#2e3137");

            m.edit(``, embed);
        });
  }
}
