import { Migration } from '@mikro-orm/migrations'

export class Migration20241229104001 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`Role\` (\`id\` bigint unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`User\` (\`id\` bigint unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`User\` add unique \`User_username_unique\`(\`username\`);`,
    )

    this.addSql(
      `create table \`Patient\` (\`id\` bigint unsigned not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`phone_number\` varchar(255) not null, \`user_id\` bigint unsigned null, \`created_at\` datetime not null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`Patient\` add index \`Patient_user_id_index\`(\`user_id\`);`,
    )

    this.addSql(
      `create table \`Employee\` (\`id\` bigint unsigned not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`degree\` varchar(255) not null, \`specialist\` varchar(255) not null, \`user_id\` bigint unsigned null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`Employee\` add index \`Employee_user_id_index\`(\`user_id\`);`,
    )

    this.addSql(
      `create table \`user_roles\` (\`user_id\` bigint unsigned not null, \`role_id\` bigint unsigned not null, primary key (\`user_id\`, \`role_id\`)) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`user_roles\` add index \`user_roles_user_id_index\`(\`user_id\`);`,
    )
    this.addSql(
      `alter table \`user_roles\` add index \`user_roles_role_id_index\`(\`role_id\`);`,
    )

    this.addSql(
      `alter table \`Patient\` add constraint \`Patient_user_id_foreign\` foreign key (\`user_id\`) references \`User\` (\`id\`) on update cascade on delete set null;`,
    )

    this.addSql(
      `alter table \`Employee\` add constraint \`Employee_user_id_foreign\` foreign key (\`user_id\`) references \`User\` (\`id\`) on update cascade on delete set null;`,
    )

    this.addSql(
      `alter table \`user_roles\` add constraint \`user_roles_user_id_foreign\` foreign key (\`user_id\`) references \`User\` (\`id\`) on update cascade on delete cascade;`,
    )
    this.addSql(
      `alter table \`user_roles\` add constraint \`user_roles_role_id_foreign\` foreign key (\`role_id\`) references \`Role\` (\`id\`) on update cascade on delete cascade;`,
    )

    this.addSql(`drop table if exists \`employees\`;`)

    this.addSql(`drop table if exists \`patients\`;`)

    this.addSql(`drop table if exists \`roles\`;`)

    this.addSql(`drop table if exists \`users\`;`)
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`user_roles\` drop foreign key \`user_roles_role_id_foreign\`;`,
    )

    this.addSql(
      `alter table \`Patient\` drop foreign key \`Patient_user_id_foreign\`;`,
    )

    this.addSql(
      `alter table \`Employee\` drop foreign key \`Employee_user_id_foreign\`;`,
    )

    this.addSql(
      `alter table \`user_roles\` drop foreign key \`user_roles_user_id_foreign\`;`,
    )

    this.addSql(
      `create table \`employees\` (\`id\` bigint unsigned not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`degree\` varchar(255) not null, \`specialist\` varchar(255) not null, \`user_id\` bigint unsigned null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`employees\` add index \`employees_user_id_index\`(\`user_id\`);`,
    )

    this.addSql(
      `create table \`patients\` (\`id\` bigint unsigned not null auto_increment primary key, \`full_name\` varchar(255) not null, \`age\` int not null, \`address\` varchar(255) not null, \`phone_number\` varchar(255) not null, \`user_id\` bigint unsigned null, \`created_at\` datetime not null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`patients\` add index \`patients_user_id_index\`(\`user_id\`);`,
    )

    this.addSql(
      `create table \`roles\` (\`id\` bigint unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`users\` (\`id\` bigint unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(
      `alter table \`users\` add unique \`users_username_unique\`(\`username\`);`,
    )

    this.addSql(`drop table if exists \`Role\`;`)

    this.addSql(`drop table if exists \`User\`;`)

    this.addSql(`drop table if exists \`Patient\`;`)

    this.addSql(`drop table if exists \`Employee\`;`)

    this.addSql(`drop table if exists \`user_roles\`;`)
  }
}
