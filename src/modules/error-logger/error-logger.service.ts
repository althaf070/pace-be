import { Injectable } from '@nestjs/common';
import { CreateErrorLoggerDto } from './dto/create-error-logger.dto';
import { UpdateErrorLoggerDto } from './dto/update-error-logger.dto';

@Injectable()
export class ErrorLoggerService {
  create(createErrorLoggerDto: CreateErrorLoggerDto) {
    return 'This action adds a new errorLogger';
  }

  findAll() {
    return `This action returns all errorLogger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} errorLogger`;
  }

  update(id: number, updateErrorLoggerDto: UpdateErrorLoggerDto) {
    return `This action updates a #${id} errorLogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} errorLogger`;
  }
}
