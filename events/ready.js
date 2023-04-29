const { Events, ActivityType } = require('discord.js');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
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

        // const shuffle = new ButtonBuilder()
        //     .setCustomId('shf')
        //     .setEmoji('🔀')
        //     .setStyle(ButtonStyle.Secondary);


        // const stop = new ButtonBuilder()
        //     .setCustomId('stp')
        //     .setEmoji('⏹️')
        //     .setStyle(ButtonStyle.Danger);


        // const plapau = new ButtonBuilder()
        //     .setCustomId('plpa')
        //     .setEmoji('⏯️')
        //     .setStyle(ButtonStyle.Primary);


        // const skip = new ButtonBuilder()
        //     .setCustomId('skp')
        //     .setEmoji('⏭️')
        //     .setStyle(ButtonStyle.Primary);

        // const queue = new ButtonBuilder()
        //     .setCustomId('que')
        //     .setEmoji('📜')
        //     .setStyle(ButtonStyle.Success);

        // const row = new ActionRowBuilder()
        //     .addComponents(shuffle, stop, plapau, skip, queue);


        // const MusicPlayerCn = client.channels.cache.get('1101844417482080370')
        // const messges = MusicPlayerCn.messages.fetch('1101881761971048539')
        // messges.then(msg => msg.edit({ content: ' ', components: [row] }))
    },
};