module.exports = {
	name: 'np',
	aliases: ['nowplayning', 'tocandoagora', 'ta'],
	description: 'Comando para ver o que está sendo tocado.',
	cooldown: 5,
	execute(message) {
		const embed = require("../struct/simpleEmbed");

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return embed.send("<:aviso:766066082187444225>| Não há nada tocando.", message.channel);
		return embed.send(`🎶| Tocando agora: **${serverQueue.songs[0].title}**`, message.channel);
	}
};
