const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('memes')
        .setDescription('Get a random meme from r/memes'),
    async execute(interaction) {
        interaction.deferReply()
        const client = interaction.client;
        const embed = await require('../../modules/reddit')(client, "memes")

        interaction.editReply({ embeds: [embed] }).catch(err => console.log(err)).catch(err => require('../../modules/handleError')(interaction, err))
    }
}