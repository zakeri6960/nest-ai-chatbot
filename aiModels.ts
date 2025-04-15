import axios from "axios";
import OpenAI from "openai";

export async function Ollama(message: string) {
    try {
        const ollamaApiUrl = 'http://localhost:11434/api/generate';

        const response = await axios.post(ollamaApiUrl, {
        model: 'gemma2:9b',
        prompt: message,
        });

        const responses = parseTextToJSON(response.data);

        let allResponse = '';
        for (const item of responses) {
        if (item.response) {
            allResponse += item.response;
        }
        }

        return allResponse.trim(); 
    } catch (error) {
        console.error('Error in sendMessage:', error.message);
        return `Error: ${error.message}`;
    }

    
}

function parseTextToJSON(text: string): any[] {
    const lines = text.split('\n');
    const jsonObjects = lines.map(line => {
        try {
        return JSON.parse(line);
        } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return null;
        }
    }).filter(item => item !== null);

    return jsonObjects;
}

export async function DeepSeek(message: string){
    
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-5df5c7d3b0fd418c974d4a6f98ff1db1'
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, {role: "user", content: "hi"}],
        model: "deepseek-chat",
    });

    return completion

}