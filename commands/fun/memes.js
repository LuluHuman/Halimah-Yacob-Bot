const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('memes')
        .setDescription('Get a random meme from r/memes'),
    async execute(interaction) {
        const client = interaction.client;
        const embed = await require('../../modules/reddit')(client, "memes")
        try {
            interaction.reply({ embeds: [embed] }).catch(err => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }
}