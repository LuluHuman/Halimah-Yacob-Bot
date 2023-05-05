const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed, queueSnippet }, noQueue, musicControlls, musicControllsEmbed } = require('../../modules/messageHandler')

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
      .catch(err => require('../../modules/handleError')(interaction, err))

    interaction.reply({ embeds: [embed2], ephemeral: true })
      .catch(err => require('../../modules/handleError')(interaction, err))
    const MusicPlayerCn = client.channels.cache.get('1101844417482080370')
    const msg = await MusicPlayerCn.send({ embeds: [embed2] }
      .catch(err => require('../../modules/handleError')(interaction, err)))
    setTimeout(() => {
      musicControlls(client, musicControllsEmbed(queue.songs[0], queue))
      msg.delete()
        .catch(err => require('../../modules/handleError')(interaction, err))
    }, 5000);
  }
}
