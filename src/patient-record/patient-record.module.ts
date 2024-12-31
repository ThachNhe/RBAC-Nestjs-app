import { Module } from '@nestjs/common';
import { PatientRecordController } from './patient-record.controller';
import { PatientRecordService } from './patient-record.service';

@Module({
  controllers: [PatientRecordController],
  providers: [PatientRecordService]
})
export class PatientRecordModule {}
