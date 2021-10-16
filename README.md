# TaskForce challenge 4.0 backend

a Restful API for an employee management system

## SETTING UP ENVIRONMENT

```shell
$ brew install node
```

check if it's available

```shell
$ node -v
```

### Check if you have git client

```shell
$ git --version
```

### Now clone repo

```shell
$ git clone https://github.com/ngaboindev/taskforce-backend-challenge.git
```

### Usage

**Rename "_.env.example_" to "_.env_" and update values/settings to your own**

### Install dependencies

with npm

```shell
npm install
```

### Start local server

```shell
 $ npm run dev
```

## DOCUMENTATION

API DOC available here : https://empmanagementapi.herokuapp.com/documentation/v1

## API ENDPOINTS

### _BASEURL: `/api/v1`_

### AUTHENTICATION END POINTS : `/auth/`

| HTTP METHOD | END POINT                         | DESCRIPTION                                                       |
| ----------- | --------------------------------- | ----------------------------------------------------------------- |
| POST        | `/auth/register/manager`          | Create a New Manager                                              |
| POST        | `/auth/login/manager`             | Authenticate Manager                                              |
| POST        | `/auth/confirm/:confirmToken`     | Confirm Email sent to Manager's email                             |
| POST        | `/auth/forgotpassword`            | Reset the password by providing an email address to get rest link |
| POST        | `/auth/resetpassword/:resettoken` | Link to reset password by providing new password for Manager      |

### EMPLOYEE FEATURES END POINTS (ACCESS : MANAGER ONLY) : `/employee/`

| HTTP METHOD | END POINT                                  | DESCRIPTION                                       |
| ----------- | ------------------------------------------ | ------------------------------------------------- |
| GET         | `/employee?code=EMP321&position=developer` | search employee based on position,name,code,phone |
| POST        | `/employee`                                | Create a New Employee                             |
| PUT         | `/employee/:id`                            | Update Employee Infos                             |
| DELETE      | `/employee/:id`                            | Delete Employee                                   |
| PUT         | `/employee/:id/suspend`                    | Suspend an employee.                              |
| POST        | `/employee/:id/activate`                   | activate an employee                              |

### Things i wish i've done if i had more time

- unit & integration tests
- finishing documentation
- doing CD/CI

## Author

Robert Ngabo `<robbingabo9@gmail.com>`
