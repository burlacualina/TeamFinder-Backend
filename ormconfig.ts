import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions={
    type: 'postgres',
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'alina', 
    database: 'Backend', 
    synchronize: true, 
    logging: true, 
    entities: ['dist/src/**/*.js'], 
}
export default config ;