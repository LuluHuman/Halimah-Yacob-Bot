const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('aww')
        .setDescription('Get aww'),
    async execute(interaction) {
        const client = interaction.client;
        const embed = await require('../../modules/reddit')(client, "aww")
        interaction.reply({ embeds: [embed] }).catch(err => require('../../modules/handleError')(interaction, err))
    }
}