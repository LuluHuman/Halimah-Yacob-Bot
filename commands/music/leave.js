const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed } } = require('../../modules/messageHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Go out of the Country(voice channel)'),
  async execute(interaction) {
    const client = interaction.client
    client.distube.voices.leave(interaction)

    const embed = titleEmbed(client, "colorSuccess", "success", "Left voice channel")
    interaction.reply({ embeds: [embed] });
  }
}
