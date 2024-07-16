import { Client } from "discord.js";
import { readFileSync } from "fs";

export const handleTabooWords = (client: Client) => {
    // TODO: move file to Cloud storage
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
        
        const wordsJson = JSON.parse(readFileSync('./taboo-words.json').toString())
        const words: string[] = wordsJson.words

        const messageContent = message.content.toLowerCase()

        const containsForbiddenWord = words.some((word: string) => {
            return messageContent.includes(word.toLowerCase());
        });

        if (containsForbiddenWord) {
            await message.reply(` ${message.author.displayName}'s message was deleted because it contained inappropriate content.`);
            await message.delete()
            }
    });

}