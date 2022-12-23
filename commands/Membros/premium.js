module.exports = {
    name: "premium",
    premium: true,
    run: async (client, message, args, idioma) => {
        message.reply(client.la[idioma]["comandos"]["ajustes"]["claim"]["variable2"])
    }
}
