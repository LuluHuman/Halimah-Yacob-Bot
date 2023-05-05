const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { embed: { titleEmbed, playlistinfoEmbed } } = require('../../modules/messageHandler')
const { SoundCloudPlugin } = require("@distube/soundcloud");
const ytpl = require('ytpl');
const fs = require('fs')

module.exports = {
  inVoiceChannel: true,
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption(option =>
      option.setName('song')
        .setDescription('Song URL/Name')
        .setRequired(true)
    ),

  async execute(interaction) {
    var keyword = interaction.options.getString("song");
    const client = interaction.client;
    const voiceChannel = interaction.member.voice.channel;
    const queue = await client.distube.getQueue(interaction);

    if (!voiceChannel) return interactionReply({ error: true, interType: "reply" }, 'You need to be in a voice channel to play music')
    if (queue && (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId)) {
      return interactionReply({ error: true, interType: "reply" }, 'You are not in the same voice channel')
    }
    await interactionReply("reply", "colorBG", "search", 'Searching...')

    if (keyword.includes("youtube.com") && keyword.includes("list=")) return youtubeQuery(keyword)
    if (keyword.includes("spotify.com")) return spotifyQuery(keyword)
    if (keyword.length > 148) { return interactionReply({ error: true, interType: "editReply" }, "Search query is too long") }

    client.distube.search(keyword)
      .then((x) => success(x))
      .catch(() => {
        SoundCloudPlugin.search(keyword)
          .then(() => success({ type: "video" }))
          .catch((err) => interactionReply({ error: true, interType: "editReply" }, err))
      })


    // Functions
    // Success Functions
    function success(x, source) {
      const queue = client.distube.getQueue(interaction);
      interaction.editReply({ embeds: [titleEmbed(client, "colorBG", "search", 'Search found!')] })
        .catch(err => require('../../modules/handleError')(interaction, err))

      const items = source === "youtube" ? x.items : x.trackList
      if (x.type !== "track" && !queue && source) playlistHandler(items, source, x)
      if (source && items && items.length > 50) {
        interactionReply("editReply", "colorBG", "warning", `Loading Songs...`)
          .catch(err => require('../../modules/handleError')(interaction, err))
        if (queue) queue.pause(); client.addingPlaylist = true
      }
      client.distube.play(voiceChannel, keyword, {
        textChannel: interaction.channel,
        member: interaction.member,
      }).catch(err => require('../../modules/handleError')(interaction, err))
    }

    async function interactionReply(type, color, emoji, title) {
      if (type.error) {
        type = type.interType
        title = color
        color = "colorError"
        emoji = "error"
      }
      return await interaction[type]({
        embeds: [titleEmbed(client, color, emoji, title)],
        ephemeral: true,
      })
        .catch(err => require('../../modules/handleError')(interaction, err))
    }

    function playlistHandler(items, source, x) {
      const name = source === "youtube" ? x.title : x.name
      const icon = source === "youtube" ? x.bestThumbnail.url : x.coverArt.sources[0].url
      const playlist = {
        source: source, name: name, user: interaction.user,
        url: keyword, icon: icon, thumbnail: icon,
        songs: items
      }
      interaction.channel.send({ embeds: [playlistinfoEmbed(playlist, queue)] })
        .catch(err => require('../../modules/handleError')(interaction, err))
    }
    // Query Functions
    async function youtubeQuery(keyword) {
      const v = await ytpl.validateID(keyword)
      if (!v) return interactionReply({ error: true, interType: "editReply" }, 'Invalid Playlist ID')

      return await ytpl(keyword)
        .then(async (playlist) => {
          return client.distube.search(keyword)
            .then(() => success(playlist, "youtube"))
            .catch((err) => interactionReply({ error: true, interType: "editReply" }, err))
        })
        .catch((err) => interactionReply({ error: true, interType: "editReply" }, err))
    }
    async function spotifyQuery(keyword) {
      const fetch = require('isomorphic-unfetch')
      const { getData } = require('spotify-url-info')(fetch)

      return getData(keyword)
        .then(async (spotify) => success(spotify, "spotify"))
        .catch(err => {
          if (String(err).includes('Couldn\'t find any data in embed page that we know how to parse.'))
            return interactionReply({ error: true, interType: "editReply" }, 'No search results found\n ' + err)
          else
            return interactionReply({ error: true, interType: "editReply" }, err)
        })
    }
  },
}