import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// TODO: Test
@Injectable()
export class BcryptUtil {
  async hash(string: string) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(string, salt);
    return hashed;
  }

  async compare(string: string, hash: string) {
    const result = await bcrypt.compare(string, hash);
    return result;
  }
}
