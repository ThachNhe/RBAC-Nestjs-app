import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { EntityRepository, EntityManager } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Role } from '@/shared/enum'
import { PatientRecord } from '@/db/entities'

@Injectable()
export class PatientRecordService {
  constructor(
    @InjectRepository(PatientRecord)
    private readonly patientRecordRepository: EntityRepository<PatientRecord>,
    private readonly em: EntityManager,
  ) {}

  async findAll(user: any) {
    if (user.role === Role.DOCTOR || user.role === Role.NURSE) {
      return this.patientRecordRepository.findAll({
        populate: ['patient', 'doctor'],
      })
    } else if (user.role === Role.PATIENT) {
      return this.patientRecordRepository.find(
        { patient: { id: user.id } },
        { populate: ['patient', 'doctor'] },
      )
    }
    throw new ForbiddenException('Access denied')
  }

  async findOne(id: number, user: any) {
    const record = await this.patientRecordRepository.findOne(
      { id },
      {
        populate: ['patient', 'doctor', 'patient.user'], // Thêm patient.user để có thể truy cập user_id
      },
    )

    if (!record) {
      throw new NotFoundException('Record not found')
    }

    if (user.role === Role.DOCTOR || user.role === Role.NURSE) {
      return record
    } else if (
      user.role === Role.PATIENT &&
      record?.patient?.user?.id === user.id
    ) {
      // Kiểm tra user_id của patient thay vì patient_id
      return record
    }

    throw new ForbiddenException('Access denied')
  }

  async create(createDto: any, user: any) {
    if (user.role !== Role.DOCTOR) {
      throw new ForbiddenException('Only doctors can create records')
    }

    const record = this.patientRecordRepository.create({
      ...createDto,
      doctor_id: user.id,
    })

    await this.em.persistAndFlush(record)
    return record
  }

  async update(id: number, updateDto: any, user: any) {
    const record = await this.patientRecordRepository.findOne({ id })

    if (!record) {
      throw new NotFoundException('Record not found')
    }

    if (user.role !== Role.DOCTOR) {
      throw new ForbiddenException('Only doctors can update records')
    }

    this.em.assign(record, updateDto)
    await this.em.flush()

    return record
  }

  async remove(id: number, user: any) {
    const record = await this.patientRecordRepository.findOne({ id })

    if (!record) {
      throw new NotFoundException('Record not found')
    }

    if (user.role !== Role.DOCTOR) {
      throw new ForbiddenException('Only doctors can delete records')
    }

    await this.em.removeAndFlush(record)
    return record
  }
}
