const { SlashCommandBuilder } = require('discord.js')
const { embed: { titleEmbed }, noQueue } = require('../../modules/messageHandler')

module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName('fix')
        .setDescription('fix if not playing'),
    async execute(interaction) {
        const guild = interaction.guild
        const client = interaction.client
        const me = guild.members.cache.get("1101327465974087731")

        const queue = client.distube.getQueue(interaction)
        const fixVc = client.channels.cache.get('1101845083126501457')
        const curVs = me.voice.channel

        me.voice.setChannel(fixVc)
        setTimeout(() => {
            me.voice.setChannel(curVs)
        }, 1000)

        interaction.reply({ embeds: [titleEmbed(client, "colorBG", "success", "Fixed")] })
    }
}
