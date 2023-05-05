const {  SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Change volume of currently playing song')
    .addIntegerOption(option => option.setName('volume').setDescription('Volume to set').setRequired(true)),
  async execute(interaction) {
    if (noQueue(interaction)) return;
    
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    const volume = interaction.options.getInteger('volume')
    queue.setVolume(volume)
    
    interaction.reply({ embeds: [titleEmbed(client, "colorBG", "volume", `Volume set to ${volume}%`)], ephemeral: true })
      .catch(err => require('../../modules/handleError')(interaction, err))

    const MusicPlayerCn = client.channels.cache.get('1101844417482080370')
    const msg = await MusicPlayerCn.send({ embeds: [titleEmbed(client, "colorBG", "volume", `Volume set to ${volume}%`)] })
      .catch(err => require('../../modules/handleError')(interaction, err))

    setTimeout(() => {
      musicControlls(client, musicControllsEmbed(queue.songs[0], queue))
      msg.delete()
        .catch(err => require('../../modules/handleError')(interaction, err))
    }, 5000);
  }
}
