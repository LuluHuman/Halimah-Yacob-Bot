const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop Playing'),
  async execute(interaction) {
    const client = interaction.client;
    const queue = client.distube.getQueue(interaction.guildId)
    noQueue(interaction)
    queue.stop()
    interaction.reply({ embeds: [titleEmbed(client, "colorBG", "stop", `Stopped`)]})
  }
}
