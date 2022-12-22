const { Client, Collection, Partials, GatewayIntentBits} = require('discord.js');
const handler = require("./handler/index");
const fs = require('fs');
const mongoose = require('mongoose');
const serverSchema = require(`${process.cwd()}/modelos/servidor.js`)


const myIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.MessageContent
]

const myPartials = [
  Partials.Channel,
  Partials.Message,
  Partials.Reaction
]
const client = new Client({
  partials: myPartials,
  intents: myIntents
});

const Discord = require('discord.js');
require('dotenv').config()

module.exports = client; 

client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config')


handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// AntiCrash
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[GRAVE] Rejeição possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});

client.login(process.env.TOKEN);

/* SISTEMA DE IDIOMAS */
client.la = {};
let idiomas = fs.readdirSync('./idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""));
for(const idioma of idiomas){
    client.la[idioma] = require(`./idiomas/${idioma}`)
}
Object.freeze(client.la);


/* MONGODB */
mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`Conectado`)
    }).catch((err) => {
        console.log(`☁ ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB`);
        console.log(err)
    })