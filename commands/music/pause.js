const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed, queueSnippet }, noQueue, musicControlls, musicControllsEmbed } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current song'),
  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    if (noQueue(interaction)) return;
    clearInterval(client.inveral)

    const embed2 = queueSnippet(queue, !queue.paused)
    if (queue.paused) {
      queue.resume()
      client.inveral = setInterval(() => {
        musicControlls(client, musicControllsEmbed(song, queue))
      }, 10000);
    } else {
      queue.pause()
    }
    interaction.reply({ embeds: [embed2], ephemeral: true })
    queue.textChannel.send({ embeds: [embed2] })
  }
}
