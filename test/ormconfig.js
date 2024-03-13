"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'alina',
    database: 'Backend',
    synchronize: true,
    logging: true,
    entities: ['dist/src/**/*.js'],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map