const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed, queueSnippet }, noQueue } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the current song'),
  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    if (noQueue(interaction)) return;
      musicControlls(client, musicControllsEmbed(song, queue))

    const embed2 = queueSnippet(queue, !queue.paused)
    queue.resume()
    interaction.reply({ embeds: [embed2], ephemeral: true })
    queue.textChannel.send({ embeds: [embed2] })
  }
}
