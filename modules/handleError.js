module.exports = (interaction, error) => {
    console.error(error, `Error executing ${interaction.commandName}`);
    interaction.channel.send({
        content: `There was an error trying to execute that command\n` +
            `at ${interaction.commandName ? interaction.commandName : "<UNKNOWN>"} \`\`\`\n` +
            error +
            `\n\`\`\`\n<@635303930879803412>\n`
    });
}