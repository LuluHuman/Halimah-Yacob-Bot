const { Events } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.log(`No command matching ${interaction.commandName} was found.`);
                interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        } else if (interaction.isButton()) {
            const client = interaction.client;
            if (interaction.customId === 'shf') {
                client.commands.get('shuffle').execute(interaction);
            } else if (interaction.customId === 'stp') {
                client.commands.get('stop').execute(interaction);
            } else if (interaction.customId === 'plpa') {
                client.commands.get('pause').execute(interaction);
            } else if (interaction.customId === 'skp') {
                client.commands.get('skip').execute(interaction);
            } else if (interaction.customId === 'que') {
                client.commands.get('queue').execute(interaction);
            } else if (interaction.customId === "morememes") {
                const embed = await require('../modules/reddit')(client, "memes")
                const morememes = new ButtonBuilder()
                    .setCustomId('morememes')
                    .setLabel('More Memes')
                    .setStyle(ButtonStyle.Success);
                const row = new ActionRowBuilder().addComponents(morememes);
                interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err)); 
            } else if (interaction.customId === "moreaww") {
                const embed = await require('../modules/reddit')(client, "aww")
                const morememes = new ButtonBuilder()
                    .setCustomId('moreaww')
                    .setLabel('More Memes')
                    .setStyle(ButtonStyle.Success);
                const row = new ActionRowBuilder().addComponents(morememes);
                interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err)); 
            }
        } else if (interaction.isStringSelectMenu()) {
            // respond to the select menu
        }


    },
};