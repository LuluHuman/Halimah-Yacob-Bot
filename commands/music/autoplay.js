const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue } = require('../../modules/messageHandler')
module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Toggle Autoplay'),

  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    if (noQueue(interaction)) return;

    const autoplay = queue.toggleAutoplay()
    const embed2 = titleEmbed(client, "colorSuccess", "success", `AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)

    interaction.reply({ embeds: [embed2] })
      .catch(err => require('../../modules/handleError')(interaction, err))

  }
}
