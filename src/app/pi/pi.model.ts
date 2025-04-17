import { AuthUser } from '../../common/type/auth-user.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsObject } from 'class-validator';
import { BaseMongooseDocument } from 'src/common/model/base-mongoose-document.model';

@Schema({
  timestamps: true,
})
export class PiModel extends BaseMongooseDocument {
  @Prop()
  piValue: string;

  @Prop({
    type: IsObject,
  })
  createdBy: AuthUser;
}

export const PiSchema = SchemaFactory.createForClass(PiModel);
