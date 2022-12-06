import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CatsRequestDto } from '../cats/dto/cats.request.dto';
import { Cat } from '../cats/cats.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  // 로그인
  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요');
    }

    const payload = { email: email, id: cat.id };
    return {
      id: cat.id,
      token: this.jwtService.sign(payload),
    };
  }

  // 회원가입
  async singUp(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('이미 존재합니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  // 탈퇴
  async deleteUser(cat: Cat) {
    return this.catsRepository.deleteCat(cat);
  }
}
