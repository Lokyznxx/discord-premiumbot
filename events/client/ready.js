const client = require("../../index");
const { ActivityType } = require('discord.js')
const chalk = require("chalk");

module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {Client} client 
   */
  async execute(client) {

    let status = [
      `/help | ${client.guilds.cache.size.toLocaleString('en-US')} Servidores`,
      `/help | ${client.users.cache.size.toLocaleString('en-US')} Usuarios`,
    ],
      i = 0
    setInterval(() => {
      client.user.setActivity(`${status[i++ % status.length]}`, {
        type: ActivityType.Playing
      })
    }, 60000);
    console.log(chalk.blueBright(`[READY] Bot Online!`));
  }
}