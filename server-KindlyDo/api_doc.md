# KindlyDo Server API Documentation

Public Link: https://kindlydo.dhyonz.com
API Link: https://ip-p2.dhyonz.com

&nbsp;

## Models :

_User_
```
- name: string, required
- email: string, required, unique
- proUser: boolean
- password: string, required
```

_Task_
```
- name
- description
- assignerId
- assigneeId
- status
```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /login`

And routes below need authentication :

- `GET /`
- `GET /users`
- `GET /users/:id`
- `POST /task/ai,`
- `GET /task/all`
- `GET /task/other`
- `POST /task/`
- `GET /task/:id`


Routes below need authentication & authorization :

- `PUT /task/:id`
- `DELETE /task/:id`

&nbsp;

## 1. POST /login

(LOGIN BY GOOGLE)

_Response (200 - OK)_
```json
{
  "access_token": "string"
}
```
&nbsp;

## 2. GET /users

_Response (200 - OK)_

Description:
- Get all users from database

```json
[
  {
    "id": 1,
    "name": "Dio Meiwandany",
    "email": "diomeiwandany@gmail.com"
  },
  {
    "id": 2,
    "name": "Ini Membaca",
    "email": "inimembaca@gmail.com"
  },
  {
    "id": 3,
    "name": "Dio Meiwandany",
    "email": "d.meiwandany@gmail.com"
  },
  {
    "id": 4,
    "name": "Tien Dany",
    "email": "tienhost.tech@gmail.com"
  },
  ...
]
```

&nbsp;

## 3. GET /users/:id

Description:
- Get specified user from database

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Dio Meiwandany",
  "email": "diomeiwandany@gmail.com",
  "proUser": true,
  "createdAt": "2024-06-14T06:55:20.049Z",
  "updatedAt": "2024-06-14T06:55:20.049Z"
}
```

_Response (400 - Not Found)_
```json
{
  "message": "User not found"
}
```

## 4. GET /

Description:
- Get personal (by id) task list 

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
  [
  {
    "id": 6,
    "name": "Electricity Server Room",
    "description": "Check For Stability",
    "assignerId": 1,
    "assigneeId": 1,
    "status": "Done",
    "createdAt": "2024-06-16T15:28:50.896Z",
    "updatedAt": "2024-06-20T16:19:44.859Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 1,
      "name": "Dio Meiwandany"
    }
  },
  {
    "id": 1,
    "name": "Check FrontEnd",
    "description": "Bugfix",
    "assignerId": 1,
    "assigneeId": 1,
    "status": "On progress",
    "createdAt": "2024-06-14T06:56:49.307Z",
    "updatedAt": "2024-06-16T15:36:38.587Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 1,
      "name": "Dio Meiwandany"
    }
  }
]
```

## 5. POST /task/ai

Description:
- Assis OpenAI

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- body:
```json
{
  "question": "YOUR QUESTION"
}
```


_Response (201 - Created)_
ANSWER


## 6. GET /task/all

Description:
- Show all tasks

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": 6,
    "name": "Electricity Server Room",
    "description": "Check For Stability",
    "assignerId": 1,
    "assigneeId": 1,
    "status": "Done",
    "createdAt": "2024-06-16T15:28:50.896Z",
    "updatedAt": "2024-06-20T16:19:44.859Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 1,
      "name": "Dio Meiwandany"
    }
  },
  {
    "id": 5,
    "name": "Angkat Jemuran",
    "description": "Bisi Hujan",
    "assignerId": 1,
    "assigneeId": 4,
    "status": "Done",
    "createdAt": "2024-06-16T08:33:35.119Z",
    "updatedAt": "2024-06-20T07:13:15.147Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 4,
      "name": "Tien Dany"
    }
  },
  {
    "id": 4,
    "name": "Check Log",
    "description": "Check Log at /var/log/syslog",
    "assignerId": 1,
    "assigneeId": 4,
    "status": "On progress",
    "createdAt": "2024-06-16T08:26:43.542Z",
    "updatedAt": "2024-06-16T08:26:43.542Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 4,
      "name": "Tien Dany"
    }
  },
  {
    "id": 2,
    "name": "Buy electronics",
    "description": "Buy at Tokopaedi",
    "assignerId": 1,
    "assigneeId": 2,
    "status": "On progress",
    "createdAt": "2024-06-14T06:56:49.307Z",
    "updatedAt": "2024-06-14T06:56:49.307Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 2,
      "name": "Ini Membaca"
    }
  },
  {
    "id": 1,
    "name": "Check FrontEnd",
    "description": "Bugfix",
    "assignerId": 1,
    "assigneeId": 1,
    "status": "On progress",
    "createdAt": "2024-06-14T06:56:49.307Z",
    "updatedAt": "2024-06-16T15:36:38.587Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 1,
      "name": "Dio Meiwandany"
    }
  }
]
```

&nbsp;

## 7. GET /task/other

Description: 
- Show all tasks except login user

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": 5,
    "name": "Angkat Jemuran",
    "description": "Bisi Hujan",
    "assignerId": 1,
    "assigneeId": 4,
    "status": "Done",
    "createdAt": "2024-06-16T08:33:35.119Z",
    "updatedAt": "2024-06-20T07:13:15.147Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 4,
      "name": "Tien Dany"
    }
  },
  {
    "id": 4,
    "name": "Check Log",
    "description": "Check Log at /var/log/syslog",
    "assignerId": 1,
    "assigneeId": 4,
    "status": "On progress",
    "createdAt": "2024-06-16T08:26:43.542Z",
    "updatedAt": "2024-06-16T08:26:43.542Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 4,
      "name": "Tien Dany"
    }
  },
  {
    "id": 2,
    "name": "Buy electronics",
    "description": "Buy at Tokopaedi",
    "assignerId": 1,
    "assigneeId": 2,
    "status": "On progress",
    "createdAt": "2024-06-14T06:56:49.307Z",
    "updatedAt": "2024-06-14T06:56:49.307Z",
    "assigner": {
      "id": 1,
      "name": "Dio Meiwandany"
    },
    "assignee": {
      "id": 2,
      "name": "Ini Membaca"
    }
  }
]
```


## 8. POST /task

Description:
- Add Task

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- body:
```json
{
  "name": "Task Name",
  "description": "Task Description",
  "assignerId": <id assigner>,
  "assigneeId": <id assignee>,
  "status": "(On progress or Done)",
}
```

_Response (200 - OK)_
```json
{
  "message": `Task <task name> has been created`
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 9. GET /task/:id

Description:
- Get task detail by id

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```


_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Check FrontEnd",
  "description": "Bugfix",
  "assignerId": 1,
  "assigneeId": 1,
  "status": "On progress",
  "createdAt": "2024-06-14T06:56:49.307Z",
  "updatedAt": "2024-06-16T15:36:38.587Z"
}
```

## 9. PUT /task/:id

Description:
- Update task detail by id

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```
- body:
```json
{
  "name": "Task Name",
  "description": "Task Description",
  "assignerId": <id assigner>,
  "assigneeId": <id assignee>,
  "status": "(On progress or Done)",
}
```

_Response (200 - OK)_
```json
{
  "message": `Task with id ${data.id} - ${data.name} has been updated`
}
```

## 9. DELETE /task/:id

Description:
- Delete task detail by id

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params: 
ID Task

_Response (200 - OK)_
```json
{
  "message": `Task with id ${data.id} - ${data.name} has been deleted`
}
```
