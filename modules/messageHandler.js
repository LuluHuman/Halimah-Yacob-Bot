const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const thismod = require('./messageHandler')

exports.embed = {}
exports.embed.titleEmbed = function (client, color, emote, title ) {
    const embed = new EmbedBuilder()
        .setColor(client.config.settings[color])
        .setAuthor({ name: client.config.emoji[emote]})
        .setTitle(`${title}`)
        return embed
}

exports.embed.queueSnippet = function (queue, paused) {
    const pause = paused === true ? 'Paused' : 'Resumed'
    const embed = new EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({name: "Song " + pause})
        .setTitle(`${queue.songs[0].name} ${pause}`)
        .setDescription(queue.songs[1] ? `**${queue.songs[1].name}** up next` : 'No more songs in queue')
    return embed
}

exports.embed.songinfoEmbed = function ({ source, name, formattedDuration, url, thumbnail, views, likes, uploader, user }, queue, addQueue) {
    const embed = new EmbedBuilder()
        .setColor(source === 'youtube' ? '#FF0000' : '#F26F23')
        .setTitle(`${addQueue ? 'Added song to queue' : 'Now Playing'}: ${name}`)
        .setDescription(`Requested by: ${user}`)
        .setURL(url)
        .setAuthor({ name: uploader.name , url: uploader.url })
        .setThumbnail(thumbnail)
        .addFields(
            { name: '⏱Duration', value: formattedDuration, inline: true },
            { name: '👁️Views', value: String(views), inline: true },
            { name: '👍Likes', value: String(likes), inline: true },
        )
        .addFields(
            { name: '🔉Volume', value: queue.volume + "%", inline: true },
            { name: '🔁Loop', value: queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off', inline: true }
        )
        .setTimestamp()
    return embed
}

exports.embed.playlistinfoEmbed = function (playlist, queue, addQueue) {
    const embed = new EmbedBuilder()
        .setColor(playlist.source === 'youtube' ? '#FF0000' : '#F26F23')
        .setTitle(`${addQueue ? 'Added playlist to queue' : 'Now Playing'}: ${playlist.name}`)
        .setDescription(`Requested by: ${playlist.user}`)
        .setURL(playlist.url)
        .setThumbnail(playlist.thumbnail)
        .addFields(
            { name: '🎵Songs', value: String(playlist.songs.length)},
        )
        .addFields(
            { name: '🔉Volume', value: queue.volume + "%", inline: true },
            { name: '🔁Loop', value: queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off', inline: true }
        )
        .setTimestamp()
    return embed
}

exports.noQueue = function (interaction) {
    const client = interaction.client;
    const embed1 = thismod.embed.titleEmbed(client, "colorWarning", "warning", 'There is nothing playing!')
    const queue = client.distube.getQueue(interaction)

    if (!queue) {
        interaction.reply({ embeds: [embed1], ephemeral: true });
        return true
    }
}