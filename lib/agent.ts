import ollama from "ollama";
import { Model } from "./DB/schema/modelsSchema";
import { Rag } from "./DB/schema/ragsSchema";
import axios from "axios";

// export async function Ollama(message: string, activeModel: string) {
//     try {
//         const activeModel = await Model.findOne({active:true});
//         if(!activeModel){
//             return "Model Error!";
//         }

//         const rags = await Rag.find({}, {rag: 1, _id: 0});
//         let ragsMessage = ''
//         rags.map(rag=>{
//             ragsMessage += rag.rag
//         });

//         let finalMessage = 
//         'بر اساسس اطلاعات پایین به سوال کاربر پاسخ بده: ' + 
//         rags + '   ' + 'سوابق مکالمه تو با کاربر: ' + message +
//         'با توجه به اطلاعات داده شده و با توجه به سوابق مکالمه با آخرین سوال کاربر پاسخ بده';

//         const response = await ollama.chat({
//             model: activeModel.model,
//             messages: [{role: 'system', content: message}]
//         })

        
//         return response.message.content;
//     } catch (error) {
//         console.error('Error in sendMessage:', error.message);
//         return `Error: ${error.message}`;
//     }

    
// }

export async function Ollama(message: string, activeModel: string) {
    try {
        const rags = await Rag.find({}, {rag: 1, _id: 0});
        let ragsMessage = ''
        rags.map(rag=>{
            ragsMessage += ' ' + rag.rag
        });
        const ollamaApiUrl = 'http://localhost:11434/api/generate';

        const response = await axios.post(ollamaApiUrl, {
        model: activeModel,
        prompt: ragsMessage + ' | ' + message + " {role: 'assistant', message: "
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

