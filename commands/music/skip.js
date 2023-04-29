const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed, songinfoEmbed }, noQueue } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),
  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    noQueue(interaction)

    try {
      const song = await queue.skip()
      interaction.reply({ embeds: [songinfoEmbed(song, queue)]})
    } catch (e) {
      interaction.reply({ embeds: [titleEmbed(client, "colorError", "error", e)]})
    }
  }
}
