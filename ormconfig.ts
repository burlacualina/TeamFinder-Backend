import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions={
    type: 'postgres',
    host: 'atc-2024-postgresql-server.postgres.database.azure.com', 
    port: 5432, 
    username: 'xforce_kgmdhq', 
    password: 'ATC2024!SecurePassword', 
    database: 'atc-2024-xforce-postgresql-database', 
    synchronize: true, 
    logging: true, 
    entities: ['dist/src/**/*.js'], 
}
export default config ;