require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();
console.log(client.user);

const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const bot = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

// Diretório dos eventos
const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

client.login("NTM0NDYwNTM3Mzc1ODE3NzQ5.XDzpKQ.eMR4BY3Z3L-GlmrQIfkd3M4cNrs");
bot.login(bot.config.token);
