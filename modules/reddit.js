module.exports = async (client, sub) => {
    const { EmbedBuilder } = require('discord.js')
    const axios = require('axios');
    const subreddits = {
        "memes": [
            'memes',
            'dankmemes',
            'me_irl',
            'funny',
            'teenagers',
            'teenagersnew',
        ],
        "aww": ["aww"]
    }
    const { data } = await axios.get(`https://www.reddit.com/r/${subreddits[sub][Math.floor(Math.random() * subreddits[sub].length)]}.json?limit=500&count=500`).catch(err => console.log(err));
    const randNO = Math.floor(Math.random() * data.data.children.length)

    var post = data.data.children[randNO].data
    if (post.crosspost_parent_list) post = post.crosspost_parent_list
    const embed = new EmbedBuilder()
        .setColor(client.config.settings.colorBG)
        .setTitle((post.is_video ? "[Vid] " : "[Img] ") + post.title)
        .setDescription(`👍 ${post.ups} | 💬 ${post.num_comments}\nPosted at: <t:${post.created}:R>`)
        .setURL("https://www.reddit.com" + post.permalink)
        .setAuthor({ name: `Posted by: ${post.author}`, iconURL: "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-144x144.png" })
        .setTimestamp()
        .setFooter({ text: 'In memory of MasonBot (2021)', iconURL: "https://cdn.discordapp.com/attachments/821589662635393075/856808905690447913/8QTN5DD.png" });
    if (post.is_video) {
        embed.setImage(post.thumbnail)
    } else {
        embed.setImage(post.url)
    }

    return embed;
}
