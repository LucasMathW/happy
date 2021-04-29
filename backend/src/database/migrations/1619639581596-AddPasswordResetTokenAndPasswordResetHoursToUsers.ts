import {IsNull, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddPasswordResetTokenAndPasswordResetHoursToUsers1619639581596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'users', [
        new TableColumn({
          name : 'PasswordResetToken',
          type: 'varchar',
          isNullable: true
        }),
        new TableColumn({
          name : 'PasswordResetExpires',
          type: 'date',
          isNullable: true
        })
      ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name : 'PasswordResetExpires',
        type: 'date',
        isNullable: true

      }),
      new TableColumn({
        name : 'PasswordResetToken',
        type: 'string',
        isNullable: true
      })
    ])
  }
}
