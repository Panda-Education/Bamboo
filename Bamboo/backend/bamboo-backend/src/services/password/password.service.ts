import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordService {

  private readonly rounds:number = 10

  private bc = bcrypt

  /**
   * Method to hash passwords
   * @param password {string} -- User input password
   * @return {string} -- Hashed password
   */
  async hashPassword(password:string):Promise<string> {
    return this.bc.hash(password, this.rounds)
  }

  /**
   * Method to compare and validate a hashed password with a raw string
   * @param password_hash {string} -- Hash of password stored in DB
   * @param password_input {string} -- User input password
   * @return {boolean} -- True => password matches; False => passwords do not match
   */
  async validatePassword(password_hash:string, password_input:string):Promise<boolean> {
    return this.bc.compare(password_hash, password_input)
  }


}
