const {
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');
const { Aki } = require('aki-api');

const { akiButton, akiButton2 } = require('../../modules/messageHandler')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aki')
        .setDescription('Play a game of Akinator!'),

    async execute(interaction) {
        const client = interaction.client;

        if (client.akigames.has(interaction.user.id)) {
            return interaction.reply({ content: "You are already playing a game of Akinator", ephemeral: true })
        }

        const loading = (new EmbedBuilder()
            .setTitle("Think of a character")
            .setColor('#00FF00')
            .setThumbnail("https://cdn.discordapp.com/attachments/1035445683139915816/1035448156181233664/etonnement.default.default.png")
            .setAuthor({
                "name": interaction.user.username, "iconURL": interaction.user.avatarURL()
            }))

        interaction.reply({ embeds: [loading] })

        const region = 'en';
        const aki = new Aki({ region });
        await aki.start();

        client.akigames.set(interaction.user.id, {"aki": aki, "message": interaction})

        const embed = (new EmbedBuilder()
            .setTitle(aki.question)
            .setColor('#00FF00')
            .setThumbnail("https://cdn.discordapp.com/attachments/1035445683139915816/1035448156181233664/etonnement.default.default.png")
            .setAuthor({
                "name": interaction.user.username, "iconURL": interaction.user.avatarURL()
            })
            .setFooter({ text: `Question ${aki.currentStep} | Progression: ${Math.floor(aki.progress)}%` }))

        const row = akiButton()
        const row2 = akiButton2()

        const response =
            await interaction.editReply({
                embeds: [embed],
                components: [row, row2],
            });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 300000 });
        } catch (e) {
            await interaction.editReply({content:"Timeout", components: [] });;
            client.akigames.delete(interaction.user.id)
        }
    }
}