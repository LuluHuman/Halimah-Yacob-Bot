const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed, songinfoEmbed } } = require('../../modules/messageHandler')
const fs = require('fs')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the current playing song'),
  async execute(interaction) {
    const client = interaction.client;
    const queue = client.distube.getQueue(interaction)

    const embed1 = titleEmbed(client, "colorWarning", "warning", 'There is nothing in the queue right now!')
    if (!queue) return interaction.reply({embeds: [embed1], ephemeral: true})

    const song = queue.songs[0]
    const embed2 = songinfoEmbed(song, queue)
    interaction.reply({ embeds: [embed2]})
  }
}
