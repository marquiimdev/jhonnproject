module.exports = {
  name: 'message',
  async execute(message) {
    const { join } = require('path');
    const { readdirSync } = require('fs');
    const MusicClient = require('../struct/Client');
    const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });
    const { Collection, MessageEmbed } = require('discord.js');

    // Diretório dos comandos
    const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
    	const command = require(`../commands/${file}`);
    	client.commands.set(command.name, command);
    }

    // Prefixo pelo MySQL
    const db = require("../struct/db");
    let result = await db.getPrefix({id: message.guild.id});
    let prefixo = result[0].prefixo;

    if (!message.content.startsWith(`${prefixo}`) || message.author.bot) return;

  	const args = message.content.slice(prefixo.length).split(/ +/);
  	const commandName = args.shift().toLowerCase();

  	// Busca pelo comando ou aliases
  	const command = client.commands.get(`${commandName}`) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  	if (!command) return;

  	function sendEmbed(msg) {
  		const embed = new MessageEmbed()
  		.setDescription(`${msg}`)
  		.setColor("#2e3137");

  		return message.channel.send(embed)
  	}

  	if (command.guildOnly && message.channel.type !== 'text') return sendEmbed(`Não posso executar esse comando na DM.`);

  	// Caso haja erro de sintaxe no comando
  	if (command.args && !args.length) {
  		let reply = ``;
  		if (command.usage) reply += `\n<:aviso:766066186814881812>| Uso correto do comando: \`${prefixo}${command.name} ${command.usage}\``;
  		return sendEmbed(reply);
  	}

  	// Cooldown
  	if (!client.cooldowns.has(command.name)) {
  		client.cooldowns.set(command.name, new Collection());
  	}

  	const now = Date.now();
  	const timestamps = client.cooldowns.get(command.name);
  	const cooldownAmount = (command.cooldown || 3) * 1000;
  	if (timestamps.has(message.author.id)) {
  		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  		if (now < expirationTime) {
  			const timeLeft = (expirationTime - now) / 1000;
  			return sendEmbed(`Aguarde mais **${timeLeft.toFixed(1)}** segundos para usar o comando \`${command.name}\` novamente.`);
  		}
  	}
  	timestamps.set(message.author.id, now);
  	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  	try {
  		command.execute(message, args, client);
  	} catch (error) {
  		console.error(error);
  	}
  }
}
