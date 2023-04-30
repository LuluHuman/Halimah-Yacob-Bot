const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue, musicControlls } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop Playing'),
  async execute(interaction) {
    const client = interaction.client;
    const queue = client.distube.getQueue(interaction.guildId)
    if (noQueue(interaction)) return;
    
    queue.stop()
    interaction.reply({ embeds: [titleEmbed(client, "colorBG", "stop", `Stopped`)], ephemeral: true})
    queue.textChannel.send({ embeds: [titleEmbed(client, "colorBG", "stop", `Stopped`)] })
    musicControlls(client, titleEmbed(client, "colorBG", "stop", `Nothing is currently playing`))
  }
}
