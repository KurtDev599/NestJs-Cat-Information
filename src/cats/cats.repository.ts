import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model, Types } from 'mongoose';
import { CatsRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
import { CommentsSchema } from '../comments/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    return newCat.readOnlyData;
  }

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const allCat = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return allCat;
  }

  async deleteCat(cat: Cat) {
    await this.catModel.findByIdAndDelete(cat._id);
    return true;
  }
}
