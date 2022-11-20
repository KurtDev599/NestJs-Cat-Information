import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async singUp(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('이미 존재합니다.');
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hasedPassword,
    });

    return cat.readonlyData;
  }
}
