const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')
module.exports = {
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
    .setName('owoify')
    .setDescription('OwOify a yowr message OwO :3')
    .addStringOption(option => option.setName('message').setDescription('Yowr message two OwOify').setRequired(true)),
    async execute(interaction) {
        const client = interaction.client;
        const webhk = client.config.webhck
        const message = interaction.options.getString('message');
        const { data } = await axios.get(`https://nekos.life/api/v2/owoify?text=${encodeURIComponent(message)}`)
        axios.post(webhk, {
            content: data.owo,
            username: interaction.user.username,
            avatar_url: interaction.user.avatarURL()
        })
        interaction.reply({ content: "OwOified yowr message OwO :3", ephemeral: true })
    }
}