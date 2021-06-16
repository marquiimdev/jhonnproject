const { Util } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Comando para tocar música.',
	aliases: ['tocar'],
	usage: '[nome da música]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		//Embed
		const embed = require("../struct/simpleEmbed");

		const { channel } = message.member.voice;
		if (!channel) return embed.send("Você não está em um canal de voz, conecte-se e tente novamente.", message.channel);
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return embed.send("Não tenho as permissões necessárias para me conectar no seu canal de voz.", message.channel);
		if (!permissions.has('SPEAK')) return embed.send("Não tenho as permissões necessárias para falar no seu canal de voz.", message.channel);

		const serverQueue = message.client.queue.get(message.guild.id);

		var search = require('youtube-search');
		var opts = {
		  maxResults: 10,
		  key: process.env.YOUTUBE_API_KEY
		};

		search(args.join(" "), opts, async function(err, results) {
		  if (err | results.length < 1) return embed.send("<:nope:758755720593932318>| Não encontrei essa música.");

			const songInfo = await ytdl.getInfo(results[0].link);
			const song = {
				id: songInfo.videoDetails.video_id,
				title: Util.escapeMarkdown(songInfo.videoDetails.title),
				url: songInfo.videoDetails.video_url
			};

			if (serverQueue) {
				serverQueue.songs.push(song);
				console.log(serverQueue.songs);
				return embed.send(`🎶| Adicionado a fila: **${song.title}**.`, message.channel)
			}

			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: channel,
				connection: null,
				songs: [],
				volume: 2,
				playing: true
			};
			message.client.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);

			const play = async song => {
				const queue = message.client.queue.get(message.guild.id);
				if (!song) {
					queue.voiceChannel.leave();
					message.client.queue.delete(message.guild.id);
					return;
				}

				const dispatcher = queue.connection.play(ytdl(song.url))
					.on('finish', () => {
						queue.songs.shift();
						play(queue.songs[0]);
					})
					.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(queue.volume / 5);
				return embed.send(`🎶| Tocando agora: **${song.title}**`, queue.textChannel);
			};

			try {
				const connection = await channel.join();
				queueConstruct.connection = connection;
				play(queueConstruct.songs[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				message.client.queue.delete(message.guild.id);
				await channel.leave();
			}
		});
	}
};
