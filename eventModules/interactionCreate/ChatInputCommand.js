module.exports = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`No command matching ${interaction.commandName} was found.`);
        interaction.reply({ content: "!" })
        require('../../modules/handleError')(interaction, `There was an error trying to execute that command\n\`No command matching ${interaction.commandName} was found`)
        return;
    }

    await command.execute(interaction)
        .catch(err => require('../../modules/handleError')(interaction, err))
}