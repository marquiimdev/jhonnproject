module.exports = {
	name: 'pause',
	description: 'Comando para pausar.',
	aliases: ['pausar'],
	cooldown: 5,
	execute(message) {
		const embed = require("../struct/simpleEmbed");

		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return embed.send('⏸| A música pausou.', message.channel);
		}
		return embed.send("<:aviso:766066082187444225>| Não há nada tocando.", message.channel);
	}
};
