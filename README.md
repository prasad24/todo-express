## A Todo REST api
Using using Node.js, express.js and uses JWTToken for authentication and Mysql database

## API's supported

### `/api/user`
| API             | HTTP METHOD  | DESCRIPTION                 |
| --------------- | ------------ | --------------------------- |
| /api/user       | POST         | Create a user               |
| /api/user/login | POST         | Login user. It return a JWT |

### `/api/todo`
| API            | HTTP METHOD  | DESCRIPTION    |
| -------------- | ------------ | -------------- |
| /api/todo      | POST         | Create Todo    |
| /api/todo/:id  | PUT          | Update Todo    |
| /api/todo/:id  | DELETE       | Delete Todo    |
| /api/todo/:id  | GET          | Get Todo By Id |
| /api/todo      | GET          | Get all todos  |
