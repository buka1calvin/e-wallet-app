import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export default class BcryptUtil {
  static hash(string: string): string {
    const pasSalt = genSaltSync(10);
    const pasHash = hashSync(string, pasSalt);
    return pasHash;
  }

  static compare(value1: string, value2: string): boolean {
    const validPass = compareSync(value1, value2);
    return validPass;
  }
}