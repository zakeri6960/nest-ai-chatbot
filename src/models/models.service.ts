import { Injectable } from '@nestjs/common';
import ConnectMongoDB from 'lib/DB/ConnectMongoDB';
import { Model } from 'lib/DB/schema/modelsSchema';
import ollama from 'ollama';

@Injectable()
export class ModelsService {
  async getModels() {
    try {
      await ConnectMongoDB();
      const modelsList = await ollama.list();

      await Promise.all(
        modelsList.models.map(async (model) => {
          try {
            const foundModel = await Model.findOne({ model: model.name });
            if (!foundModel) {
              const lastItem = await Model.findOne().sort({ id: -1 });
              const id = (lastItem?.id || 0) + 1;

              await Model.create({
                id,
                model: model.name,
                parameter_size: model.details?.parameter_size || 'unknown',
                active: false,
              });
            }
          } catch (innerError) {
            console.error(`Error processing model ${model.name}:`, innerError);
          }
        }),
      );

      const models = await Model.find();
      return {
        status: 'success',
        message: null,
        data: models,
      };
    } catch (error) {
      console.error('Global error:', error);
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    }
  }

  async modelActivation(modelId: number){
    try {
        await ConnectMongoDB();
        await Model.updateMany({}, {$set:{active: false}});
        await Model.updateOne({id: modelId}, {$set:{active: true}});
    } catch (error) {
        
    }    
  }
}
