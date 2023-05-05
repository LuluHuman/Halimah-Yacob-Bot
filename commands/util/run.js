const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('run')
        .setDescription('Run a command'),
    async execute(interaction) {
        
        interaction.reply("d").catch(err => console.log(err));

    }
}
