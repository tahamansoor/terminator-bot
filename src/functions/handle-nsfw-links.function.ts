import cheerio  from "cheerio";
import { Client, Message } from "discord.js";
import { readFileSync } from "fs";

export const handleNSFWLinks = (client: Client) => {
    client.on('messageCreate', async (message: Message) => {
        // Ignore messages from the bot itself
        if (message.author.bot) return;

        // Regular expression to match URLs
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        const urls = message.content.match(urlPattern);

        if (urls) {
            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    const body = await response.text();
                    const $ = cheerio.load(body);

                    // Extract text content from the page
                    const textContent = $('body').text().toLowerCase();

                    const wordsJson = JSON.parse(readFileSync('./taboo-words.json').toString())
                    const words: string[] = wordsJson.words

                    // Simple keyword-based detection
                    const isNSFW = words.some(keyword => textContent.includes(keyword));

                    if (isNSFW) {
                        await message.reply(`${message.author.displayName} NSFW links are not allowed here`);
                        await message.delete();
                        break;
                    }
                } catch (error) {
                    console.error(error);
                    await message.reply('Failed to fetch the content of the website.');
                }
            }
        }
    });


}