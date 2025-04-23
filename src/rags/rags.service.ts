import { Injectable } from '@nestjs/common';
import ConnectMongoDB from 'lib/DB/ConnectMongoDB';
import { Rag } from 'lib/DB/schema/ragsSchema';
import { RagType } from 'lib/types';

@Injectable()
export class RagsService {

    async getRags(){
        try {
            await ConnectMongoDB();
            const rags = await Rag.find({});
            return {
                status: 'success',
                message: null,
                data: rags
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null
            }
        }

    }

    async updateRag(ragData: RagType){
        try {
            await ConnectMongoDB();
            const update = await Rag.findOneAndUpdate({id: ragData.id}, {$set: {title: ragData.title, rag: ragData.rag, category_id: ragData.category_id}});
            if(!update){
                return {
                    status: 'error',
                    message: "Update failed! Try again",
                    data: null
                }
            }
            return {
                status: 'success',
                message: null,
                data: update
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null
            }
        }

    }

    async deleteRag(ragId: number){
        try {
            await ConnectMongoDB();
            const result = await Rag.findOneAndDelete({id: ragId});
            if(!result){
                return {
                    status: 'error',
                    message: "Delete failed! Try again",
                    data: null
                }
            }
            return {
                status: 'success',
                message: null,
                data: result
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null
            }
        }

    }

    

}
