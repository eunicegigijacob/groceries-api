import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { ClientSession, FilterQuery, Model, ProjectionType } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  public returnUser(user: UserDocument): any {
    const { _id, first_name, last_name, email, phone_number, dial_code } = user;

    return {
      id: _id,
      first_name,
      last_name,
      email,
      phone_number,
      dial_code,
    };
  }

  public async create(user: any): Promise<UserDocument> {
    const newUser = await this.usersModel.create({
      ...user,
      verified: false,
    });

    return newUser;
  }

  public async getUserByFilter(filter: any): Promise<UserDocument> {
    const user = await this.usersModel.findOne(filter).exec();
    return user ?? null;
  }

  public async getById(id: string, project?: ProjectionType<UserDocument>) {
    const user = (await this.usersModel.findById(id, project)) as UserDocument;

    return user;
  }

  public async updateById(
    id: string,
    data: FilterQuery<User>,
    session?: ClientSession,
  ): Promise<UserDocument> {
    const user = (await this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true, session },
    )) as UserDocument;

    return user;
  }
}
