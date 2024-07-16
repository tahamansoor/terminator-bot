import { Client, GatewayIntentBits } from "discord.js";
import { createCommands, env, handleNSFWLinks, handlePing, handleTabooWords } from "./functions";
import { commands } from "./config"

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration,
    ]

})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});




createCommands(client, commands)

handlePing(client)

handleTabooWords(client)

handleNSFWLinks(client)

client.login(env('TOKEN'))
