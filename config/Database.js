import {Sequelize} from "sequelize"

const db = new Sequelize('tesker_hpai', 'root', '', {
    host: 'localhost',
    dialect:'mysql' // or'mariadb' if using MariaDB instead of MySQL.
});

export default db;