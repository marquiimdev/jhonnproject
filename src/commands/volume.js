module.exports = {
	name: 'volume',
	description: 'Comando para alterar o volume.',
	cooldown: 5,
	execute(message, args) {
		const embed = require("../struct/simpleEmbed");

		const { channel } = message.member.voice;
		if (!channel) return embed.send("<:aviso:766066186814881812>| Você precisa estar em um canal para alterar o volume da música.", message.channel);
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return embed.send("<:aviso:766066186814881812>| Não estou tocando nada.", message.channel);
		if (!args[0]) return embed.send(`O volume atual é: **${serverQueue.volume}**.`, message.channel);

		if (!parseInt(args[0])) return embed.send(`<:aviso:766066186814881812>| Insira um valor válido.`, message.channel);
		if (args[0] > 30) return embed.send("<:aviso:766066186814881812>| Você quer estourar o ouvido de alguém? Insira um número menor.", message.channel);

		[serverQueue.volume] = args;
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return embed.send(`Eu alterei o volume para: **${args[0]}**`, message.channel);
	}
};
