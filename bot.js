const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

// master - 696165017715998767
// team1 - 696164744653963365
// team2 - 696164824589008897
// team3 - 696164868625268826
// team4 - 696164907640553482
// team5 - 696164930835185664
// team6 - 696222676351451247
// team7 - 696222704168206366
// team8 - 696222728428191794

const channelIDs = ['696165017715998767', '696164744653963365', '696164824589008897', '696164868625268826',
 '696164907640553482', '696164930835185664', '696222676351451247', '696222704168206366', '696222728428191794']
const teamProgress = [0, 0, 0, 0, 0, 0, 0, 0]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  for (ID of channelIDs) {
    channel = client.channels.fetch(ID)
        .then(channel => channel.send(`ping ${channel.name}`))
        .catch( () => console.log('channel unknown'))
  }
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
    console.log(msg.channel.id);
  }
});

client.login(auth.token);