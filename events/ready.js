const { Events, ActivityType } = require('discord.js');
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
    },
};