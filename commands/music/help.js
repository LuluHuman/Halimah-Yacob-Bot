const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helo im under the water please help me'),
  async execute(interaction) {
    const client = interaction.client
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Commands')
          .setDescription(client.commands.map(cmd => `\`${cmd}\``).join(', '))
          .setColor('#00FF00')
      ], ephemeral: true
    })
  }
}
