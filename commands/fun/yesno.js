const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yesno')
        .setDescription('i say yes or no')
        .addStringOption(option => option.setName('question').setDescription('The question to ask').setRequired(true)),
    async execute(interaction) {
        const yesno = String(Math.random() * 10).split("")[0] % 2 == 1 ? "yes" : "no";
        const client = interaction.client;
        const question = interaction.options.getString('question');

        const exampleEmbed = new EmbedBuilder()
            .setColor(client.config.settings.colorBG)
            .setTitle("Question: " + question)
            .setDescription(yesno)
            .setTimestamp()
            
        await interaction.reply({ embeds: [exampleEmbed] });
    }
}