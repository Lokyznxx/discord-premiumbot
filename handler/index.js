const fs = require("node:fs");
const chalk = require("chalk");

//Carregar eventos
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            
            if (event.name) {
                console.log(chalk.greenBright(` ✔️  => ${file} Event loaded.`));
            } else {
                console.log(chalk.redBright(` ❌  => ${file} Event not loaded.`));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

//Carregar comandos de prefixo
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
                console.log(chalk.greenBright(` ✔️  => ${file} Prefix command loaded.`));
            } else {
                console.log(chalk.redBright(` ❌  => ${file} Prefix command not loaded.`));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

//Carregar slashcommands
const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./slashcommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./slashcommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../slashcommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log(chalk.greenBright(` ✔️  => ${file} SlashCommand loaded`));
            } else {
                console.log(chalk.redBright(` ❌  => ${file} SlashCommand not loaded`));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // SlashCommands em servidor específico
        // await client.guilds.cache
        //    .get("ID DO SEU SERVIDOR")
        //    .commands.set(slash);

        // SlashCommands global
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}