const {
  EmbedBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helo im under the water please help me'),
  async execute(interaction) {
    const client = interaction.client
    const sortedCommands = {}
    // var page = 0

    client.commands.forEach(cmd => {
      if (!sortedCommands[cmd.catorgory]) sortedCommands[cmd.catorgory] = []
      sortedCommands[cmd.catorgory].push(cmd)
    })

    const help = new EmbedBuilder()
      .setTitle('Commands')
      .setDescription("Here's a list of all my commands")
      .setColor('#00FF00')

    for (const catorgory in sortedCommands) {
      const catorgoryCommands = sortedCommands[catorgory]
      // if (page == 0) {
        help.addFields({name: catorgory, value: catorgoryCommands.map(cmd => `\`${cmd.data.name}\``).join(', ')})
      // }
    }

    // const prevhelp = new ButtonBuilder()
    //   .setCustomId('prevhelp')
    //   .setEmoji('1104663078727057428')
    //   .setStyle(ButtonStyle.Success);

    // const nexthelp = new ButtonBuilder()
    //   .setCustomId('nexthelp')
    //   .setEmoji('1104663082376110183')
    //   .setStyle(ButtonStyle.Success);

    // const row = new ActionRowBuilder()
    //   .addComponents(prevhelp, nexthelp);

    // const response = 
    await interaction.reply({
      embeds: [help],
      // components: [row],
    });

    // const collectorFilter = i => i.user.id === interaction.user.id;

    // try {
    //   const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 3_000 });

    //   if (confirmation.customId === 'prevhelp') {
    //     await interaction.editReply({ content: 'Action confirmed', components: [] });
    //   } else if (confirmation.customId === 'nexthelp') {
    //     await interaction.editReply({ content: 'Action cancelled', components: [] });
    //   }
    // } catch (e) {
    //   await interaction.editReply({ components: [] });;
    // }
  }
}
