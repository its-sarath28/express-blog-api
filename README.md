# Blog-API Project

## Tech stack

**Server:** NodeJS, ExpressJS, MongoDB, JWT

# API Features

- Authentication & Authorization
- Post CRUD operations
- Comment functionality
- Admin can block a user
- Admin can unblock a blocked user
- A user can block different users
- A user who block another user cannot see his/her posts
- Last date a post was created
- Check if a user is active or not
- Check last date a user was active
- Changing user award base on number of posts created by the user
- A user can follow and unfollow another user
- Get following and followers count
- Get total profile viewers count
- Get posts created count
- Get blocked counts
- Get all users who views someone's profile
- Update password
- Profile photo uploaded
- A user can delete his/her account

# End-points

- [API Authentication](#API-Authentication)

  - [Register a new API client](#Register-a-new-API-client)
  - [Login](#User-Login)

- [User](#User-Login)

  - [Get my profile](#Get-my-profile)
  - [Get all users](https://www.github.com/octokatherine)
  - [View a user profile Count](https://www.github.com/octokatherine)
  - [Following a user](https://www.github.com/octokatherine)
  - [UnFollowing-a-user](https://www.github.com/octokatherine)
  - [Update user password](https://www.github.com/octokatherine)
  - [Update your profile](https://www.github.com/octokatherine)
  - [Block another user](https://www.github.com/octokatherine)
  - [Unblock another user](https://www.github.com/octokatherine)
  - [Admin blocking a user](https://www.github.com/octokatherine)
  - [Admin Unblocking a user](https://www.github.com/octokatherine)
  - [Delete your account](https://www.github.com/octokatherine)
  - [Upload Profile Photo](https://www.github.com/octokatherine)

- [Post](https://www.github.com/octokatherine)
  - [Create Post](https://www.github.com/octokatherine)
  - [Get All Posts](https://www.github.com/octokatherine)
  - [Get Single Post](https://www.github.com/octokatherine)
  - [Toggle Post like](https://www.github.com/octokatherine)
  - [Toggle Post dislike](https://www.github.com/octokatherine)
  - [Update Post](https://www.github.com/octokatherine)
  - [Delete Post](https://www.github.com/octokatherine)

-[Comments](https://www.github.com/octokatherine)

- [Create comment](https://www.github.com/octokatherine)
- [Update post](https://www.github.com/octokatherine)
- [Delete post](https://www.github.com/octokatherine)

# Run locally

Clone the Project

```
git clone
```

Go to project directory

```
cd [folder_name]
```

Install dependencies

```
npm install
```

Create a .env file and add

```
MONGODB_URL=

JWT_KEY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET_KEY=
```

Start the server

```
npm start
```

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update post, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example:**

`Authorization: Bearer YOUR_TOKEN`

# Register a new API client

```
POST  /api/v1/users/register
```

The request body needs to be in JSON format.

# API Reference

## User Login

```
POST  /api/v1/users/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | No       |
| `email         ` | `string` | Your email    | Yes      |
| `password      ` | `string` | Your password | Yes      |

Example request body:

```
{
  "email":"your_email",
  "password":"your_password"
}
```

## Get my profile

```
GET  /api/v1/users/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | Yes      |

## Get all users

```
GET  /api/v1/users/users
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | No       |

## View a user profile

```
GET  /api/v1/users/profile-viewers/:id
```

| Parameter        | Type     | Description                     | Required |
| :--------------- | :------- | :------------------------------ | :------- |
| `authentication` | `string` | Your token                      | Yes      |
| `id`             | `string` | ID of the user you want to view | Yes      |

## Following a user

```
GET  /api/v1/users/follow/:id
```

| Parameter        | Type     | Description                       | Required |
| :--------------- | :------- | :-------------------------------- | :------- |
| `authentication` | `string` | Your token                        | Yes      |
| `id`             | `string` | ID of the user you want to follow | Yes      |

## Unfollowing a user

```
GET  /api/v1/users/unfollow/:id
```

| Parameter        | Type     | Description                         | Required |
| :--------------- | :------- | :---------------------------------- | :------- |
| `authentication` | `string` | Your token                          | Yes      |
| `id`             | `string` | ID of the user you want to unfollow | Yes      |

## Update user password

```
PUT  /api/v1/users/update-password
```

| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :------------------ | :------- |
| `authentication` | `string` | Your token          | Yes      |
| `password`       | `string` | Enter your password | Yes      |

Example request body:

```
{
  "password":"your_password"
}
```

## Update user profile

```
PUT  /api/v1/users
```

| Parameter        | Type     | Description          | Required |
| :--------------- | :------- | :------------------- | :------- |
| `authentication` | `string` | Your token           | Yes      |
| `firstName`      | `string` | Enter your firstName | Yes      |
| `lastName`       | `string` | Enter your lastName  | Yes      |
| `email`          | `string` | Enter your email     | Yes      |

Example request body:

```
{
  "firstname":"your_firstName",
  "lastname":"your_lastName",
  "email":"your_email",
}
```

## Block another user

```
GET: /api/v1/users/blocked/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | Yes      |
| `id`             | `string` | ID of the user you want to block | Yes      |

## Block another user

```
GET: /api/v1/users/unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | Yes      |
| `id`             | `string` | ID of the user you want to unblock | Yes      |

## Admin blocking a user

```
PUT: /api/v1/users/admin-block/:id
```

| Parameter        | Type     | Description                      | Required |
| :--------------- | :------- | :------------------------------- | :------- |
| `authentication` | `string` | Your token                       | Yes      |
| `id`             | `string` | ID of the user you want to block | Yes      |

## Admin unblocking a user

```
PUT: /api/v1/users/admin-unblock/:id
```

| Parameter        | Type     | Description                        | Required |
| :--------------- | :------- | :--------------------------------- | :------- |
| `authentication` | `string` | Your token                         | Yes      |
| `id`             | `string` | ID of the user you want to unblock | Yes      |

## Delete user account

```
DELETE: /api/v1/users/delete-account
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | Yes      |

## Upload Profile Photo

```
POST: /api/v1/users/profile-photo-upload
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :-------------- | :------- |
| `authentication` | `string` | Your token      | Yes      |
| `profilePhoto`   | `string` | Image to upload | Yes      |
