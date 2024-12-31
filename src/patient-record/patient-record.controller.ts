import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common'
import { PatientRecordService } from './patient-record.service'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { Role } from '@/shared/enum'
import { JwtAuthGuard } from '@/auth/auth.guard'
import { AuthRequest } from '@/auth/auth.dto'

@Controller('patient-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientRecordController {
  constructor(private readonly patientRecordService: PatientRecordService) {}

  @Get(':id')
  @Roles(Role.DOCTOR, Role.NURSE, Role.PATIENT)
  findOne(@Param('id') id: number, @Request() user: AuthRequest) {
    return this.patientRecordService.findOne(id, user)
  }

  @Post()
  @Roles(Role.DOCTOR)
  create(@Body() createDto: any, @Request() user: AuthRequest) {
    return this.patientRecordService.create(createDto, user)
  }

  @Put(':id')
  @Roles(Role.DOCTOR)
  update(
    @Param('id') id: number,
    @Body() updateDto: any,
    @Request() user: AuthRequest,
  ) {
    return this.patientRecordService.update(id, updateDto, user)
  }

  @Delete(':id')
  @Roles(Role.DOCTOR)
  remove(@Param('id') id: number, @Request() user: AuthRequest) {
    return this.patientRecordService.remove(id, user)
  }
}
