import { Migration } from '@mikro-orm/migrations';

export class Migration20241229112757 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`User_Role\` (\`user_id\` bigint unsigned not null, \`role_id\` bigint unsigned not null, primary key (\`user_id\`, \`role_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`User_Role\` add index \`User_Role_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`User_Role\` add index \`User_Role_role_id_index\`(\`role_id\`);`);

    this.addSql(`alter table \`User_Role\` add constraint \`User_Role_user_id_foreign\` foreign key (\`user_id\`) references \`User\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`User_Role\` add constraint \`User_Role_role_id_foreign\` foreign key (\`role_id\`) references \`Role\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`drop table if exists \`user_roles\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`user_roles\` (\`user_id\` bigint unsigned not null, \`role_id\` bigint unsigned not null, primary key (\`user_id\`, \`role_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user_roles\` add index \`user_roles_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`user_roles\` add index \`user_roles_role_id_index\`(\`role_id\`);`);

    this.addSql(`alter table \`user_roles\` add constraint \`user_roles_user_id_foreign\` foreign key (\`user_id\`) references \`User\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`user_roles\` add constraint \`user_roles_role_id_foreign\` foreign key (\`role_id\`) references \`Role\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`drop table if exists \`User_Role\`;`);
  }

}
