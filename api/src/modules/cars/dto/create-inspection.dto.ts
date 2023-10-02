import { IsNotEmpty } from 'class-validator';

export class CreateInspectionDto {
  @IsNotEmpty()
  unacceptList: Array<any>;

  @IsNotEmpty()
  carId: number;
}
