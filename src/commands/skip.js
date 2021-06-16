module.exports = {
	name: 'skip',
	description: 'Comando de skip.',
	cooldown: 5,
	execute(message) {
		const Discord = require("discord.js");

		async function enviarEmbed(id) {
			let msgs = [
				'Desculpe, mas você não está em um canal de voz.',
				'Não há nenhuma música para pular.',
			]

			const embed = new Discord.MessageEmbed()
			.setDescription(`<:aviso:766066186814881812>| ${msgs[id]}`)
			.setColor("#2e3137");

			return message.channel.send(embed);
		}
		const { channel } = message.member.voice;
		if (!channel) return enviarEmbed(0);

		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return enviarEmbed(1);
		serverQueue.connection.dispatcher.end('Comando skip utilizado.');
	}
};
