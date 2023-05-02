module.exports = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`No command matching ${interaction.commandName} was found.`);
        interaction.reply({ content: `There was an error trying to execute that command\n\`No command matching ${interaction.commandName} was found.\` <@635303930879803412>` });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        interaction.reply({
            content: 
            `There was an error trying to execute that command
            \`\`\` at${interaction.commandName}
            ${error}
            \`\`\`
            <@635303930879803412>`
        });
    }
}