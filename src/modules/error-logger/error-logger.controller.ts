import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ErrorLoggerService } from './error-logger.service';
import { CreateErrorLoggerDto } from './dto/create-error-logger.dto';
import { UpdateErrorLoggerDto } from './dto/update-error-logger.dto';

@Controller('error-logger')
export class ErrorLoggerController {
  constructor(private readonly errorLoggerService: ErrorLoggerService) {}

  @Post()
  create(@Body() createErrorLoggerDto: CreateErrorLoggerDto) {
    return this.errorLoggerService.create(createErrorLoggerDto);
  }

  @Get()
  findAll() {
    return this.errorLoggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.errorLoggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErrorLoggerDto: UpdateErrorLoggerDto) {
    return this.errorLoggerService.update(+id, updateErrorLoggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorLoggerService.remove(+id);
  }
}
