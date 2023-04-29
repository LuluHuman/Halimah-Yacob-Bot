  const { SlashCommandBuilder } = require('discord.js')
  const { embed: { titleEmbed } } = require('../../modules/messageHandler')
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
        .then(success).catch(() => {
          SoundCloudPlugin.search(keyword).then(success).catch(error);
        });

      function error() {
        if (keyword.includes("spotify.com")) {
          return success()
        }
          
        return interaction.editReply({
          embeds: [titleEmbed(client, "colorError", "error", 'No search results found')],
          ephemeral: true,
        });
      }

      function success() {
        interaction.editReply({ embeds: [titleEmbed(client, "colorBG", "search", 'Search found!')] })
        client.distube.play(voiceChannel, keyword, {
          textChannel: interaction.channel,
          member: interaction.member,
        });
      }
    },
  }
