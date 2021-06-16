module.exports = {
	name: 'resume',
	aliases: ['despausar'],
	description: 'Comando para despausar.',
	cooldown: 5,
	execute(message) {
		const embed = require("../struct/simpleEmbed");

		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return embed.send('▶| A música está tocando novamente.', message.channel);
		}
		return embed.send('<:aviso:766066082187444225>| Não há nada tocando.');
	}
};
