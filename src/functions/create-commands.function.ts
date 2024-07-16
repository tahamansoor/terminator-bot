import { Commands } from "@app/types";
import { Client, SlashCommandAssertions, SlashCommandBuilder } from "discord.js";

export const createCommands = async (client: Client, cmds: Commands) => {

    client.once('ready', () => {
    for (const cmd of cmds) {
        const command = new SlashCommandBuilder()
            .setName(cmd.name)
            .setDescription(cmd.description);

        if (cmd.args) {
            for (const arg of cmd.args) {
                command.addStringOption(option =>
                    option.setName(arg).setDescription(arg)
                );
            }
        }

        try {
            client.guilds.cache.forEach((guild) => guild.commands.create(command));
        } catch (error) {
            console.error(`Error registering command: ${error}`);
        }
        }
    })
}