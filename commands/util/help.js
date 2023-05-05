const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helo im under the water please help me'),
  async execute(interaction) {
    const client = interaction.client

    const help = new EmbedBuilder()
      .setTitle('Commands')
      .setDescription(client.commands.map(cmd => `\`${cmd.catorgory}/${cmd.data.name}\``).join(', '))
      .setColor('#00FF00')
    interaction.reply({
      embeds: [help], ephemeral: true
    })
      .catch(err => require('../../modules/handleError')(interaction, err))
  }
}
