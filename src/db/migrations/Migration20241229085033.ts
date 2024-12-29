import { Migration } from '@mikro-orm/migrations';

export class Migration20241229085033 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`public\`.\`users_roles\` drop foreign key \`users_roles_role_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`patients\` drop foreign key \`patients_user_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`employees\` drop foreign key \`employees_user_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`users_roles\` drop foreign key \`users_roles_user_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`medical_records\` drop foreign key \`medical_records_patient_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`medical_records\` drop foreign key \`medical_records_doctor_id_foreign\`;`);

    this.addSql(`drop table if exists \`public\`.\`roles\`;`);

    this.addSql(`drop table if exists \`public\`.\`users\`;`);

    this.addSql(`drop table if exists \`public\`.\`patients\`;`);

    this.addSql(`drop table if exists \`public\`.\`employees\`;`);

    this.addSql(`drop table if exists \`public\`.\`medical_records\`;`);

    this.addSql(`drop table if exists \`public\`.\`users_roles\`;`);

    this.addSql(`alter table \`public\`.\`patients\` drop foreign key \`patients_user_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`employees\` drop foreign key \`employees_user_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`medical_records\` drop foreign key \`medical_records_patient_id_foreign\`;`);
    this.addSql(`alter table \`public\`.\`medical_records\` drop foreign key \`medical_records_doctor_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`users_roles\` drop foreign key \`users_roles_user_id_foreign\`;`);
    this.addSql(`alter table \`public\`.\`users_roles\` drop foreign key \`users_roles_role_id_foreign\`;`);

    this.addSql(`alter table \`public\`.\`roles\` modify \`id\` bigint unsigned not null auto_increment, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);

    this.addSql(`alter table \`public\`.\`users\` modify \`id\` bigint unsigned not null auto_increment, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);

    this.addSql(`alter table \`public\`.\`patients\` modify \`id\` bigint unsigned not null auto_increment, modify \`user_id\` bigint unsigned not null, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);
    this.addSql(`alter table \`public\`.\`patients\` add constraint \`patients_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`public\`.\`patients\` add index \`patients_user_id_index\`(\`user_id\`);`);

    this.addSql(`alter table \`public\`.\`employees\` modify \`id\` bigint unsigned not null auto_increment, modify \`user_id\` bigint unsigned not null, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);
    this.addSql(`alter table \`public\`.\`employees\` add constraint \`employees_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`public\`.\`employees\` add index \`employees_user_id_index\`(\`user_id\`);`);

    this.addSql(`alter table \`public\`.\`medical_records\` modify \`id\` bigint unsigned not null auto_increment, modify \`patient_id\` bigint unsigned not null, modify \`doctor_id\` bigint unsigned not null, modify \`created_at\` datetime not null, modify \`updated_at\` datetime not null;`);
    this.addSql(`alter table \`public\`.\`medical_records\` add constraint \`medical_records_patient_id_foreign\` foreign key (\`patient_id\`) references \`patients\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`public\`.\`medical_records\` add constraint \`medical_records_doctor_id_foreign\` foreign key (\`doctor_id\`) references \`employees\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`public\`.\`medical_records\` add index \`medical_records_patient_id_index\`(\`patient_id\`);`);
    this.addSql(`alter table \`public\`.\`medical_records\` add index \`medical_records_doctor_id_index\`(\`doctor_id\`);`);

    this.addSql(`alter table \`public\`.\`users_roles\` modify \`user_id\` bigint unsigned not null, modify \`role_id\` bigint unsigned not null;`);
    this.addSql(`alter table \`public\`.\`users_roles\` add constraint \`users_roles_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`public\`.\`users_roles\` add constraint \`users_roles_role_id_foreign\` foreign key (\`role_id\`) references \`roles\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`public\`.\`users_roles\` add index \`users_roles_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`public\`.\`users_roles\` add index \`users_roles_role_id_index\`(\`role_id\`);`);

    this.addSql(`drop schema if exists \`public\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`public\`.\`roles\` (\`id\` bigserial not null auto_increment primary key, \`name\` varchar(255) not null, \`created_at\` timestamptz not null, \`updated_at\` timestamptz not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`public\`.\`users\` (\`id\` bigserial not null auto_increment primary key, \`username\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` timestamptz not null, \`updated_at\` timestamptz not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`public\`.\`users\` add unique \`users_username_unique\`(\`username\`);`);

    this.addSql(`create table \`public\`.\`patients\` (\`id\` bigserial not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`phone_number\` varchar(255) not null, \`user_id\` bigint not null, \`created_at\` timestamptz not null, \`updated_at\` timestamptz not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`public\`.\`employees\` (\`id\` bigserial not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`degree\` varchar(255) not null, \`specialist\` varchar(255) not null, \`user_id\` bigint not null, \`created_at\` timestamptz not null, \`updated_at\` timestamptz not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`public\`.\`medical_records\` (\`id\` bigserial not null auto_increment primary key, \`patient_id\` bigint not null, \`doctor_id\` bigint not null, \`diagnosis\` text not null, \`treatment\` text not null, \`created_at\` timestamptz not null, \`updated_at\` timestamptz not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`public\`.\`users_roles\` (\`user_id\` bigint not null, \`role_id\` bigint not null, primary key (\`user_id\`, \`role_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`alter table \`public\`.\`patients\` add constraint \`patients_user_id_foreign\` foreign key (\`user_id\`) references \`public\`.\`users\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`public\`.\`employees\` add constraint \`employees_user_id_foreign\` foreign key (\`user_id\`) references \`public\`.\`users\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`public\`.\`medical_records\` add constraint \`medical_records_patient_id_foreign\` foreign key (\`patient_id\`) references \`public\`.\`patients\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`public\`.\`medical_records\` add constraint \`medical_records_doctor_id_foreign\` foreign key (\`doctor_id\`) references \`public\`.\`employees\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`public\`.\`users_roles\` add constraint \`users_roles_user_id_foreign\` foreign key (\`user_id\`) references \`public\`.\`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`public\`.\`users_roles\` add constraint \`users_roles_role_id_foreign\` foreign key (\`role_id\`) references \`public\`.\`roles\` (\`id\`) on update cascade on delete cascade;`);
  }

}
