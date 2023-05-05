const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
module.exports = async (interaction) => {
    const client = interaction.client;
    if (interaction.customId === 'shf') return client.commands.get('shuffle').execute(interaction, true);
    if (interaction.customId === 'stp') return client.commands.get('stop').execute(interaction, true);
    if (interaction.customId === 'plpa') return client.commands.get('pause').execute(interaction, true);
    if (interaction.customId === 'skp') return client.commands.get('skip').execute(interaction, true);
    if (interaction.customId === 'que') return client.commands.get('queue').execute(interaction, true);
    if (interaction.customId === "morememes") {
        const embed = await require('../../modules/reddit')(client, "memes")
        const morememes = new ButtonBuilder()
            .setCustomId('morememes')
            .setLabel('More Memes')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err))
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    if (interaction.customId === "moreaww") {
        const embed = await require('../../modules/reddit')(client, "aww")
        const morememes = new ButtonBuilder()
            .setCustomId('moreaww')
            .setLabel('More Aww')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(morememes);
        interaction.reply({ embeds: [embed], components: [row] }).catch(err => console.log(err))
            .catch(err => require('../../modules/handleError')(interaction, err))
        return
    }
    // if (interaction.customId === "roleadd") {
    //     const x = await interaction.guild.members.fetch(interaction.user.id)
    //     x.roles.add(interaction.guild.roles.cache.get("1103646651001880726")).catch(console.error);
    //     interaction.reply({ content: "Role Added", ephermal: true }).catch(err => console.log(err))
    //         .catch(err => require('../../modules/handleError')(interaction, err))
    //     return
    // }
    interaction.reply({
        content:
            `There was an error trying to execute that command
            \`No button matching id ${interaction.customId} was found.\`
            <@635303930879803412>`
    })
        .catch(err => require('../../modules/handleError')(`No button matching id ${interaction.customId} was found`, err))

}