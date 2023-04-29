const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue } = require('../../modules/messageHandler')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),
  async execute(interaction) {
    const client = interaction.client
    const queue = client.distube.getQueue(interaction)
    if (noQueue(interaction)) return;
    clearInterval(client.inveral)

    queue.skip()
    try {
      interaction.reply({ embeds: [titleEmbed(client, "colorBG", "success", "song skipped")], ephemeral: true })
      queue.textChannel.send({ embeds: [titleEmbed(client, "colorBG", "success", "song skipped")]})
    } catch (e) {
      interaction.reply({ embeds: [titleEmbed(client, "colorError", "error", e)]})
    }
  }
}
