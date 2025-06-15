import { PartialType } from '@nestjs/mapped-types';
import { CreateErrorLoggerDto } from './create-error-logger.dto';

export class UpdateErrorLoggerDto extends PartialType(CreateErrorLoggerDto) {}
