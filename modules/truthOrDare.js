module.exports = async (type, interaction) => {
    await interaction.deferReply()
        .catch(err => require('../../modules/handleError')(interaction, err))
        
    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
    const { get } = require('axios');

    const isR = Math.floor(Math.random() * 2) == 0
    const rating = isR ? '?rating=r' : ''
    const emoji = isR ? '🔞 ' : ''
    const res = await get(`https://api.truthordarebot.xyz/api/${type + rating}`)
        .catch(err => require('../modules/handleError')(interaction, err))

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Requested by: ' + interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setTitle(emoji + res.data.question)
        .setColor(type == "truth" ? '#00FF00' : '#FF0000' )
        .setFooter({ text: `Type: ${res.data.type} | Rating: ${res.data.rating} | ID: ${res.data.id}` });


    const truth = new ButtonBuilder()
        .setCustomId('truth')
        .setLabel('Truth')
        .setStyle(ButtonStyle.Success);

    const dare = new ButtonBuilder()
        .setCustomId('dare')
        .setLabel('Dare')
        .setStyle(ButtonStyle.Danger);

    const random = new ButtonBuilder()
        .setCustomId('randomtnd')
        .setLabel('Random')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(truth, dare, random);

     

    interaction.editReply({ embeds: [embed], components: [row] })
        .catch(err => require('../modules/handleError')(interaction, err))
}