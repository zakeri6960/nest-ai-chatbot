import { Injectable } from '@nestjs/common';
import ConnectMongoDB from 'lib/DB/ConnectMongoDB';
import { Categorie } from 'lib/DB/schema/categoriesSchema';

@Injectable()
export class CategoriesService {

    async getCategories(){
        try {
            await ConnectMongoDB();
            const categories = await Categorie.find();
            return {
                status: "success",
                message: null,
                data: [...categories]
            }
        } catch (error) {
            return {
                status: "error",
                message: error.message,
                data: null
            }
        }
    }
}
