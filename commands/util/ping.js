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
        })
            .catch(err => require('../../modules/handleError')(interaction, err))
        
        const memory = Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100 + "/1000MB"
        const sSince = Math.floor((Date.now() - Math.floor(process.uptime() * 1000))/1000)
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
                { name: "> Uptime", value: `<t:${sSince}:R>`, inline: true },
                { name: "> Memory Usage", value: memory }
            ])
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] })
            .catch(err => require('../../modules/handleError')(interaction, err))
    }
}