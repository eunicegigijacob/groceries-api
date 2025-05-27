import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configs } from '../configs';
import { DecodedToken } from './interface/decoded-token.interface';
import { UserRepository } from '../users/users.repository';
import { ISignUp } from './interface/signup.interface';
import { BcryptUtil } from '../utils/bcrypt.util';
import { ILogin } from './interface/login.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly bcryptUtil: BcryptUtil,
  ) {}
  checkIfTokenHasExpired(expiryTime: string): boolean {
    const currentTime = new Date().getTime();
    const expiryTimeFullFormat = new Date(expiryTime).getTime();

    if (currentTime > expiryTimeFullFormat) return true; // Token has expired
    return false; // Token has not expired
  }

  getOtpExpiryTime() {
    return new Date(new Date().getTime() + 1000 * 60 * 10); // 10 mins
  }

  // TODO: Test
  createAuthTokens(payload: DecodedToken) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 60 * 60, // 1hr
      secret: configs.JWT_SECRET,
    });

    return {
      accessToken,
    };
  }

  validatePasswordString(password: string) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!password.match(regex)) {
      throw new BadRequestException(
        'Password must contain at least a capital letter, number & greater than 8 characters.',
      );
    }

    return true;
  }

  async signup(signUpData: ISignUp) {
    const { email, first_name, last_name, password, phone_number } = signUpData;

    // check if user already exists
    const existingUser = await this.userRepository.getUserByFilter({ email });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email.');
    }

    // validate password

    this.validatePasswordString(password);

    // Hash the password
    const hashedPassword = await this.bcryptUtil.hash(password);

    //Todo: Add email verification

    // create  user

    const user = await this.userRepository.create({
      email,
      first_name,
      last_name,
      password: hashedPassword,
      phone_number,
    });

    return {
      status: true,
      message: 'Success! User created successfully.',
      data: {
        user: await this.userRepository.returnUser(user),
      },
    };
  }

  async login(loginData: ILogin) {
    const { email, password } = loginData;

    // check if user exists
    const existingUser = await this.userRepository.getUserByFilter({ email });

    if (!existingUser) {
      throw new BadRequestException('Invalid login details.');
    }

    // Validate the password
    const validatePassword = await this.bcryptUtil.compare(
      password,
      existingUser.password,
    );

    if (!validatePassword) {
      throw new BadRequestException('Invalid login details.');
    }

    // create auth tokens
    const { accessToken } = await this.createAuthTokens({
      id: existingUser.id,
      email: existingUser.email,
    });

    return {
      status: true,
      message: 'Success! User logged in successfully.',
      data: {
        user: await this.userRepository.returnUser(existingUser),
        accessToken,
      },
    };
  }
}
