import { Migration } from '@mikro-orm/migrations';

export class Migration20241229071303 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "roles" ("id" bigserial primary key, "name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "users" ("id" bigserial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "users" add constraint "users_username_unique" unique ("username");`);

    this.addSql(`create table "patients" ("id" bigserial primary key, "full_name" varchar(255) not null, "age" int not null, "address" varchar(255) not null, "phone_number" varchar(255) not null, "user_id" bigint not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "employees" ("id" bigserial primary key, "full_name" varchar(255) not null, "age" int not null, "address" varchar(255) not null, "degree" varchar(255) not null, "specialist" varchar(255) not null, "user_id" bigint not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "medical_records" ("id" bigserial primary key, "patient_id" bigint not null, "doctor_id" bigint not null, "diagnosis" text not null, "treatment" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "users_roles" ("user_id" bigint not null, "role_id" bigint not null, constraint "users_roles_pkey" primary key ("user_id", "role_id"));`);

    this.addSql(`alter table "patients" add constraint "patients_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "employees" add constraint "employees_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "medical_records" add constraint "medical_records_patient_id_foreign" foreign key ("patient_id") references "patients" ("id") on update cascade;`);
    this.addSql(`alter table "medical_records" add constraint "medical_records_doctor_id_foreign" foreign key ("doctor_id") references "employees" ("id") on update cascade;`);

    this.addSql(`alter table "users_roles" add constraint "users_roles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "users_roles" add constraint "users_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users_roles" drop constraint "users_roles_role_id_foreign";`);

    this.addSql(`alter table "patients" drop constraint "patients_user_id_foreign";`);

    this.addSql(`alter table "employees" drop constraint "employees_user_id_foreign";`);

    this.addSql(`alter table "users_roles" drop constraint "users_roles_user_id_foreign";`);

    this.addSql(`alter table "medical_records" drop constraint "medical_records_patient_id_foreign";`);

    this.addSql(`alter table "medical_records" drop constraint "medical_records_doctor_id_foreign";`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "patients" cascade;`);

    this.addSql(`drop table if exists "employees" cascade;`);

    this.addSql(`drop table if exists "medical_records" cascade;`);

    this.addSql(`drop table if exists "users_roles" cascade;`);
  }

}
