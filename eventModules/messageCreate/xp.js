const fs = require('fs');
// ../../xpDatabase/${userid}/xp
module.exports = async (client, message) => {
    const { xpAnnouncemennts } = client.config
        if (fs.existsSync(`./xpDatabase/${message.author.id}`) == false) {
            fs.mkdirSync(`./xpDatabase/${message.author.id}`)
            fs.writeFileSync(`./xpDatabase/${message.author.id}/xp`, "0")
        }
        var xp = fs.readFileSync(`./xpDatabase/${message.author.id}/xp`, "utf8")
        xp = parseInt(xp)


        ///
        if (client.xpTimer.get(message.author.id) == false) return

        xp = xp + RandomNumber(15, 25)

        fs.writeFileSync(`./xpDatabase/${message.author.id}/xp`, xp.toString())
        for (var xpreq in xpAnnouncemennts) {
            xpreq = parseInt(xpreq)
            const lvl = xpAnnouncemennts[xpreq]
            if (xp >= xpreq && xp < xpreq + 40) {
                message.channel.send({ content: `Congratulations ${message.author}! You have reached level ${lvl}!` })
                return
            }
        }
        client.xpTimer.set(message.author.id, false)
        setTimeout(function () {
            client.xpTimer.set(message.author.id, true)
        }, 60000)
        function RandomNumber() { return Math.floor(Math.random() * (39)) + 15 }
    }