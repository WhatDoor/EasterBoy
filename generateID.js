const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! - Start typing messages starting with '!' to find channel IDs`);
});

client.on('message', msg => {
    console.log(`${msg.channel.name}'s ID is ${msg.channel.id}`);
});

client.login(auth.token);