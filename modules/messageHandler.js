const {
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');
const thismod = require('./messageHandler')

exports.embed = {}
exports.embed.titleEmbed = function (client, color, emote, title) {
    const embed = new EmbedBuilder()
        .setColor(client.config.settings[color])
        .setAuthor({ name: client.config.emoji[emote] })
        .setTitle(`${title}`)
    return embed
}

exports.embed.decideEmbed = function (client, color, emote, title, desc) {

    const embed = new EmbedBuilder()
        .setColor(color ? client.config.settings[color] : client.config.settings.colorBG)
        .setTitle(title + emote)
        .setDescription(desc)
        .setTimestamp()
        .setFooter({ text: 'In memory of MasonBot (2021)', iconURL: "https://cdn.discordapp.com/attachments/821589662635393075/856808905690447913/8QTN5DD.png" });

    return embed
}


exports.embed.queueSnippet = function (queue, paused) {
    const pause = paused === true ? 'Paused' : 'Resumed'
    const embed = new EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: "Song " + pause })
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
        .setAuthor({ name: uploader.name, url: uploader.url })
        .setThumbnail(thumbnail)
        .addFields(
            { name: '⏱Duration', value: formattedDuration, inline: true },
            { name: '👁️Views', value: String(views), inline: true },
            { name: '👍Likes', value: String(likes), inline: true },
        )
        .addFields(
            { name: '🔉Volume', value: queue.volume + "%", inline: true },
            { name: '🔁Loop', value: queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off', inline: true },
            { name: '⏱️Time', value: `${formattedDuration} / ${queue.formattedCurrentTime}` }
        )
        .setTimestamp()
    return embed
}

exports.embed.playlistinfoEmbed = function (playlist, queue, addQueue) {
    if (!queue) queue = { volume: "...", repeatMode: 0 }
    const embed = new EmbedBuilder()
        .setColor(playlist.source === 'youtube' ? '#FF0000' : '#1DB954')
        .setTitle(`${addQueue ? 'Added playlist to queue' : 'Now Playing'}: ${playlist.name}`)
        .setDescription(`Requested by: ${playlist.user}`)
        .setURL(playlist.url)
        .setThumbnail(playlist.thumbnail)
        .addFields(
            { name: '🎵Songs', value: String(playlist.songs.length), inline: true },
            { name: '⚠️Warning', value: "Playlist converted from Spotify to Youtube. May contain outros" },
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

exports.musicControlls = function (client, embed) {
    const MusicPlayerCn = client.channels.cache.get('1101844417482080370')
    const messges = MusicPlayerCn.messages.fetch('1101881761971048539')
    messges.then(msg => msg.edit({ embeds: [embed], content: `` }))
}

exports.musicControllsEmbed = function ({ source, name, formattedDuration, url, thumbnail, views, likes, uploader, user, duration }, queue, addQueue) {
    const embed = new EmbedBuilder()
        .setColor(source === 'youtube' ? '#FF0000' : '#F26F23')
        .setTitle(`Now Playing:\n ${name}`)
        .setDescription(`Requested by: ${user}`)
        .setURL(url)
        .setAuthor({ name: uploader.name, url: uploader.url })
        .setThumbnail(thumbnail)
        .addFields(
            { name: '👁️Views', value: String(views), inline: true },
            { name: '👍Likes', value: String(likes), inline: true },
        )
        .addFields(
            { name: '🔉Volume', value: queue.volume + "%", inline: true },
            { name: '🔁Loop', value: queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off', inline: true },
            { name: '📄Up next', value: queue.songs[1] ? queue.songs[1].name : 'No more songs in queue', inline: false },
            { name: `⏱Timestamp`, value: formattedDuration, inline: false }
        )
        .setTimestamp()
    return embed
}

exports.akiButton = function () {
    const yesaki = new ButtonBuilder()
        .setCustomId('yesaki')
        .setLabel('Yes')
        .setStyle(ButtonStyle.Primary);

    const noaki = new ButtonBuilder()
        .setCustomId('noaki')
        .setLabel('No')
        .setStyle(ButtonStyle.Primary);


    const dkaki = new ButtonBuilder()
        .setCustomId('dkaki')
        .setLabel('Don\'t Know')
        .setStyle(ButtonStyle.Primary);


    const probaki = new ButtonBuilder()
        .setCustomId('probaki')
        .setLabel('Probably')
        .setStyle(ButtonStyle.Primary);

    const pronnotaki = new ButtonBuilder()
        .setCustomId('probnotaki')
        .setLabel('Probably Not')
        .setStyle(ButtonStyle.Primary);


    const row = new ActionRowBuilder()
        .addComponents(yesaki, noaki, dkaki, probaki, pronnotaki);

    return row
}

exports.akiButton2 = function () { 

    const endaki = new ButtonBuilder()
        .setCustomId('endaki')
        .setLabel('End')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
        .addComponents(endaki);

    return row
}