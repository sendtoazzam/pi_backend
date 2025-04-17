import { ApiProperty } from '@nestjs/swagger';
import { PiModel } from '../../pi.model';

export class PiResponseDto {
  @ApiProperty({
    description: 'Id belongs to the value',
  })
  id: string;

  @ApiProperty({
    description: 'Pi value',
  })
  piValue: number;

  @ApiProperty({
    description: 'who create',
  })
  createdBy: string;

  @ApiProperty({
    description: 'pi creation date',
  })
  createdAt: Date;

  static fromModel(model: PiModel): PiResponseDto {
    const dto = new PiResponseDto();
    dto.id = model._id;
    dto.piValue = parseFloat(model.piValue);
    dto.createdBy = model.createdBy?.userId;
    dto.createdAt = model.createdAt;

    return dto;
  }
}
