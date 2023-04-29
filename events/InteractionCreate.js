const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        } else if (interaction.isButton()) {
            console.log(interaction.customId);
            if (interaction.customId === 'no') {}
            if (interaction.customId === 'fren') {
                interaction.reply({ content: 'Button pressed!', ephemeral: true });
            }
        } else if (interaction.isStringSelectMenu()) {
            // respond to the select menu
        }
    },
};