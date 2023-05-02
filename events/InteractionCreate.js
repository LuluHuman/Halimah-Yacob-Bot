const { Events } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            require('../eventModules/interactionCreate/ChatInputCommand')(interaction);
        } else if (interaction.isButton()) {
            require('../eventModules/interactionCreate/Button')(interaction);
        }
    },
};