import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

const { STRING, TEXT, INTEGER, BOOLEAN } = DataTypes

export default sequelize => {
    class Student extends Model {}
    Student.init(
        {
            email: {
                type: STRING,
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            },
            name: {
                type: STRING
            },
            surname: {
                type: STRING
            },
            age: {
                type: INTEGER
            },
            nick: {
                type: STRING
            },
            geolocation: {
                type: TEXT
            },
            isActivated: {
                type: BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'student',
            hooks: {
                beforeCreate: student => {
                    student.password = bcrypt.hashSync(student.password, 11)
                }
            }
        }
    )
    return Student
}
