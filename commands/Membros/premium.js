module.exports = {
    name: "premium",
    premium: true,
    run: async (client, message, args) => {
        message.reply(client.la[idioma]["comandos"]["ajustes"]["claim"]["variable2"])
    }
}