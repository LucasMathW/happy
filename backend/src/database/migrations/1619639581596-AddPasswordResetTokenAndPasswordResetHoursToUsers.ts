import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddPasswordResetTokenAndPasswordResetHoursToUsers1619639581596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'users', [
        new TableColumn({
          name : 'resetPasswordToken',
          type: 'string'
        }),
        new TableColumn({
          name : 'resetPasswordHours',
          type: 'date'
        })
      ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name : 'resetPasswordHours',
        type: 'date'
      }),
      new TableColumn({
        name : 'resetPasswordToken',
        type: 'string'
      })
    ])
  }
}
