import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';


export class CreateCourse {

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly title: string

  @IsNotEmpty()  // Optional field, should send empty string if emtpy
  @IsString()
  @Expose()
  readonly description?:string

}