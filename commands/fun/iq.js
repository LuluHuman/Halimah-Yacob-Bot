const { SlashCommandBuilder } = require('discord.js')
const { embed: { decideEmbed } } = require('../../modules/messageHandler')

module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Get your IQ')
        .addUserOption(option => option.setName('user').setDescription('The user to get the IQ of')),
    async execute(interaction) {
        const client = interaction.client;
        const user = interaction.options.getUser('user') || interaction.user;
        var embedText = "";
        if (user.id == "635303930879803412") {
            embedText = `<@635303930879803412> has 0 IQ (Anymore)`
        } else if (user.id == "1101327465974087731") {
            embedText = `I have 0 IQ (What is my job anyway)`
        } else {
            embedText = `<@${user.id}> has ${Math.floor(Math.random() * (109))} IQ`
        }
        const embed = decideEmbed(client, undefined, "🧠", "Mason's IQ r8 machine", embedText)
        interaction.reply({ embeds: [embed] })
    }
}