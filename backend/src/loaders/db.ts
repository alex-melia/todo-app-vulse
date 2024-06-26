import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const connection = mysql.createConnection({
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  database: `${process.env.DATABASE_NAME}`,
  user: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
})

export function connectToDB() {
  try {
    connection.connect(function (err) {
      if (err) {
        console.log("Error: ", err.message)
      } else {
        console.log("Connected to MySQL database")
      }
    })
  } catch (error) {
    console.error("Error connecting to the database: ", error)
    process.exit(1)
  }
}
