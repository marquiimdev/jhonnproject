async function send(msg, channel) {
  const { MessageEmbed } = require("discord.js");
  const embed = new MessageEmbed()
  .setDescription(msg)
  .setColor("#2e3137");

  return channel.send(embed);
}

module.exports = { send };
