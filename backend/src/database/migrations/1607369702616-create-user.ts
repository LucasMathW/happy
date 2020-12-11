import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1607369702616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns : [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',  
                },
                {
                    name: 'name',
                    type: 'varchar',    
                },
                {
                    name: 'e_mail',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type:  'integer'   
                },
                {
                    name: 'passwordHash',
                    type: 'string'
                }
            ]

        }))        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
