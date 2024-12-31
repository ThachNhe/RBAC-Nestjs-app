import { Migration } from '@mikro-orm/migrations';

export class Migration20241229143837 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`patient_record\` (\`id\` int unsigned not null auto_increment primary key, \`diagnosis\` varchar(255) not null, \`treatment\` varchar(255) not null, \`prescription\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`patient_id\` bigint unsigned not null, \`doctor_id\` bigint unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`patient_record\` add index \`patient_record_patient_id_index\`(\`patient_id\`);`);
    this.addSql(`alter table \`patient_record\` add index \`patient_record_doctor_id_index\`(\`doctor_id\`);`);

    this.addSql(`alter table \`patient_record\` add constraint \`patient_record_patient_id_foreign\` foreign key (\`patient_id\`) references \`Patient\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`patient_record\` add constraint \`patient_record_doctor_id_foreign\` foreign key (\`doctor_id\`) references \`Employee\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`patient_record\`;`);
  }

}
