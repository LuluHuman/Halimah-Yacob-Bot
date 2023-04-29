const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { embed: { titleEmbed, playlistinfoEmbed } } = require('../../modules/messageHandler')
const { SoundCloudPlugin } = require("@distube/soundcloud");

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
    const client = interaction.client;
    const keyword = interaction.options.getString("song");
    const voiceChannel = interaction.member.voice.channel;
    const queue = await client.distube.getQueue(interaction);
    clearInterval(client.inveral)

    if (!voiceChannel) {
      return interaction.reply({
        embeds: [titleEmbed(client, "colorError", "error", 'You need to be in a voice channel to play music')],
        ephemeral: true,
      });
    }

    if (queue) {
      if (
        interaction.guild.members.me.voice.channelId !==
        interaction.member.voice.channelId
      ) {
        return interaction.reply({
          embeds: [titleEmbed(client, "colorError", "error", 'You are not in the same voice channel')],
          ephemeral: true,
        });
      }
    }

    await interaction.reply({
      embeds: [titleEmbed(client, "colorBG", "search", 'Searching...')],
      ephemeral: true,
    });

    client.distube.search(keyword)
      .then((x) => success("#FF0000",x)).catch(() => {
        SoundCloudPlugin.search(keyword).then(() => success("#F26F23", {type: "video"})).catch(error);
      });

    function error(err) {
      if (keyword.includes("spotify.com")) {
        return success("#1DB954", false)
      }

      interaction.editReply({
        embeds: [titleEmbed(client, "colorError", "error", 'No search results found\n ' + err)],
        ephemeral: true,
      });

      console.log(err)
    }

    function success(scr,x) {
      interaction.editReply({ embeds: [titleEmbed(client, "colorBG", "search", 'Search found!')] })
      if (!queue && (!x.type == "video" || !x)) {
        const embed = new EmbedBuilder()
          .setColor(scr)
          .setTitle(`Now Playing Playlist: ${keyword}`)
          .setDescription(`Requested by: ${interaction.user}`)
          .setURL(keyword)
          .setTimestamp()
        interaction.channel.send({ embeds: [embed] })
      }
      client.distube.play(voiceChannel, keyword, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
    }
  },
}
