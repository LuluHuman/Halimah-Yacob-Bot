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
    if (!voiceChannel) return error("reply", 'You need to be in a voice channel to play music')
    if (queue && (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId)) {return error("reply", 'You are not in the same voice channel')
    }

    await interactionReply("reply", interaction, client, "colorBG", "search", 'Searching...')

    if (keyword.includes("youtube.com") && keyword.includes("list=")) {
      const v = await ytpl.validateID(keyword);
      if (!v) return error("editReply", 'Invalid Playlist ID')

      return await ytpl(keyword)
        .then(async (playlist) => {
          return client.distube.search(keyword)
            .then(() => success(playlist, "youtube"))
            .catch((err) => error("editReply", err))
        })
        .catch((err) => error("editReply", err))
    }

    if (keyword.includes("spotify.com")) {
      const fetch = require('isomorphic-unfetch')
      const { getData } = require('spotify-url-info')(fetch)

      return getData(keyword)
        .then(async (spotify) => {
          return success(spotify, "spotify")
        })
        .catch(err => {
          if (String(err).includes('Couldn\'t find any data in embed page that we know how to parse.'))
            return error("editReply", 'No search results found\n ' + err)
          else
            return error("editReply", err)
        })
    }

    if (keyword.length > 148) {
      if (keyword.includes("https://") && keyword.includes("https://")) return keyword = keyword.split("?")[0]
      return error("editReply", 'Song Name is too long')
    }
    client.distube.search(keyword)
      .then((x) => success(x))
      .catch(() => {
        SoundCloudPlugin.search(keyword)
          .then(() => success({ type: "video" }))
          .catch((err) => error("editReply", err))
      });

    function success(x, source) {
      const queue = client.distube.getQueue(interaction);
      interaction.editReply({ embeds: [titleEmbed(client, "colorBG", "search", 'Search found!')] })
      if (x.type !== "track" && !queue && source) {
          const items = source === "youtube" ? x.items : x.trackList
          const name = source === "youtube" ? x.title : x.name
          const icon = source === "youtube" ? x.bestThumbnail.url : x.coverArt.sources[0].url
          const playlist = {
            source: source,
            name: name,
            user: interaction.user,
            url: keyword,
            icon: icon,
            thumbnail: icon,
            songs: items
          }
          if (items.length > 50 && queue) {
            interactionReply(type, interaction, client, color, emoji, title)
            interactionReply("editReply", interaction, client, "colorBG", "warning", 'Queue paused due to an expected lag. \nYou can unpause with /resume or /pause')
            queue.pause()
          }
          interaction.channel.send({ embeds: [playlistinfoEmbed(playlist, queue)] })
      }
      client.distube.play(voiceChannel, keyword, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
    }

    async function interactionReply(type, interaction, client, color, emoji, title) {
      return await interaction[type]({
        embeds: [titleEmbed(client, color, emoji, title)],
        ephemeral: true,
      });
    }

    function error(type, err) {
      console.log(err);
      return interactionReply(type, interaction, client, "colorError", "error", err)
    }
  },
}