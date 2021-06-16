module.exports = {
	name: 'queue',
	description: 'Comando para ver a fila.',
	aliases: ['fila'],
	cooldown: 5,
	execute(message) {
		const embed = require("../struct/simpleEmbed");

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return embed.send("<:aviso:766066186814881812>| Não estou tocando nada.", message.channel);

		let musics = ``;
		serverQueue.songs.forEach((song, number) => {
			musics += `**${number+1}**. ${song.title}\n`
		});

		return embed.send(`
			__**Músicas a seguir:**__

			${musics}

			**Tocando agora:** ${serverQueue.songs[0].title}`, message.channel);
	}
};
