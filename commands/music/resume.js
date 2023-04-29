const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { embed: {titleEmbed, queueSnippet} } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the current song'),
  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    const embed1 = titleEmbed(client, "colorWarning", "warning", 'There is nothing in the queue right now!')
    if (!queue) return interaction.reply({ embeds: [embed1], ephemeral: true })

    const embed2 = queueSnippet(queue, false)

    queue.resume()
    interaction.reply({ embeds: [embed2] })
  }
}
