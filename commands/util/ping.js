const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return ping!'),

    async execute(interaction) {
        const client = interaction.client;
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const memory = Math.floor(process.memoryUsage().heapTotal / 1000000) + "/1000MB"
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Ping",
                iconURL: client.user.displayAvatarURL(),
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.config.settings.colorBG)
            .addFields([
                { name: "> API Latency", value: `${client.ws.ping}ms`, inline: true },
                { name: "> Discord Latency", value: `${message.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
                { name: "> Uptime", value: `${Math.floor(process.uptime() * 1000)}ms`, inline: true },
                { name: "> Memory Usage", value: memory }
            ])
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
    }
}