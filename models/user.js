const { Model } = require("objection")                 // We use Model class from objection library
const db = require("../config/database_connection")    // db is the knex file that has been imported from database_connection
// const joi=require('')
Model.knex(db);


class UserModel extends Model {
    static get tableName() {
        return "obj_table"                             // database table name of objection      
    }
        static get jsonSchema() {
            return {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    id: 'integer',
                    name: {
                        type: 'string',
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    }
                }
            }
        }   

}

module.exports = UserModel