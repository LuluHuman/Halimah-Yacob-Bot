
//Packages
const { embed: { songinfoEmbed, titleEmbed, playlistinfoEmbed }, musicControlls, musicControllsEmbed } = require('./modules/messageHandler')
const config = require('./config.json')
const options = require('./modules/options')

const { DisTube } = require('distube')
const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')

const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');

const client = new Discord.Client(options.Discord)
client.config = require('./config.json')
client.db = require('./db.json');
client.distube = new DisTube(client, options.DisTube)
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.xpTimer = new Map()
client.akigames = new Map()
client.emotes = config.emoji
client.addingPlaylist = false

const foldersPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

const commandFolders = fs.readdirSync(foldersPath);
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      command.catorgory = folder
      client.commands.set(command.data.name, command);
      console.log(`[INFO] Loaded command ${command.data.name} from ${filePath}`);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

try {
  client.distube
    .on('playSong', (queue, song) => {
      musicControlls(client, musicControllsEmbed(song, queue))
      queue.textChannel.send({
        embeds: [songinfoEmbed(song, queue)]
      })
    })
    .on('addSong', (queue, song) => queue.textChannel.send({ embeds: [songinfoEmbed(song, queue, true)] }))
    .on('addList', (queue, playlist) => {
      if (client.addingPlaylist && queue.paused) queue.resume(); client.addingPlaylist = false
      queue.textChannel.send({ embeds: [playlistinfoEmbed(playlist, queue, true)]})
    })
    .on('error', (channel, e) => {
        if (channel) channel.send({ embeds: [titleEmbed(client, "colorError", "error", `An error encountered: ${e.toString().slice(0, 1974)}`)] })
    })
    .on('empty', channel => {
      musicControlls(client, titleEmbed(client, "colorBG", "stop", `Nothing is currently playing`))
      channel.send({ embeds: [titleEmbed(client, "colorBG", "stop", `Nothing is currently playing`)] })
    })
    .on('finish', queue => {
      musicControlls(client, titleEmbed(client, "colorBG", "stop", `Nothing is currently playing`))
      queue.textChannel.send({ embeds: [titleEmbed(client, "colorBG", "stop", `Stopped - End of queue`)] })
    })
} catch (error) {
  console.log(error);
}
client.login(config.bot.tokenTest)