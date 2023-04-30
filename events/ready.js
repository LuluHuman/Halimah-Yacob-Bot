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
        //     .setEmoji('1102056381563011222')
        //     .setStyle(ButtonStyle.Secondary);


        // const stop = new ButtonBuilder()
        //     .setCustomId('stp')
        //     .setEmoji('1102056378534723594')
        //     .setStyle(ButtonStyle.Danger);


        // const plapau = new ButtonBuilder()
        //     .setCustomId('plpa')
        //     .setEmoji('1102056383815360634')
        //     .setStyle(ButtonStyle.Primary);


        // const skip = new ButtonBuilder()
        //     .setCustomId('skp')
        //     .setEmoji('1102056387103694848')
        //     .setStyle(ButtonStyle.Primary);

        // const queue = new ButtonBuilder()
        //     .setCustomId('que')
        //     .setEmoji('1102056388982755368')
        //     .setStyle(ButtonStyle.Success);

        // const row = new ActionRowBuilder()
        //     .addComponents(shuffle, stop, plapau, skip, queue);


        const couting = client.channels.cache.get('1100462666486661190')
        couting.messages
        // messges.then(msg => msg.edit({ content: ' ', components: [row] }))z
    },
};