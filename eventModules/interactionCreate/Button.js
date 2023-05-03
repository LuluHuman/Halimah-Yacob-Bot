const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
module.exports = async (interaction) => {
    const client = interaction.client;
    if (interaction.customId === 'shf') return client.commands.get('shuffle').execute(interaction);
    if (interaction.customId === 'stp') return client.commands.get('stop').execute(interaction);
    if (interaction.customId === 'plpa') return client.commands.get('pause').execute(interaction);
    if (interaction.customId === 'skp') return client.commands.get('skip').execute(interaction);
    if (interaction.customId === 'que') return client.commands.get('queue').execute(interaction);
    if (interaction.customId === "morememes") {
        const embed = await require('../../modules/reddit')(client, "memes")
        const morememes = new ButtonBuilder()
            .setCustomId('morememes')
            .setLabel('More Memes')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err));
        return
    }
    if (interaction.customId === "moreaww") {
        const embed = await require('../../modules/reddit')(client, "aww")
        const morememes = new ButtonBuilder()
            .setCustomId('moreaww')
            .setLabel('More Aww')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err));
        return
    }
    interaction.reply({
        content:
            `There was an error trying to execute that command
            \`No button matching id ${interaction.customId} was found.\`
            <@635303930879803412>`
    });

}