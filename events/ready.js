const { Events, ActivityType } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.clear()
        console.log(`[INFO] Logged in as ${client.user.tag}!`);
        client.user.setPresence({
            activities: [{ name: `Singapore`, type: ActivityType.Watching}],
            status: 'dnd',
        });
        const couting = client.channels.cache.get('1100462666486661190')
        couting.messages
    },
};