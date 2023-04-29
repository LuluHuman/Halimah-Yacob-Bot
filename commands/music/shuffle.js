const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue, musicControlls, musicControllsEmbed } = require('../../modules/messageHandler')

module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue'),
    async execute(interaction) {
        const client = interaction.client;
        const queue = client.distube.getQueue(interaction.guildId)
        if (noQueue(interaction)) return;
        clearInterval(client.inveral)

        queue.shuffle()
        musicControlls(client, musicControllsEmbed(queue.songs[0], queue))
        interaction.reply({ embeds: [titleEmbed(client, "colorBG", "queue", `Queue Shuffled`)], ephemeral: true })
        queue.textChannel.send({ embeds: [titleEmbed(client, "colorBG", "queue", `Queue Shuffled`)] })
    }
}
