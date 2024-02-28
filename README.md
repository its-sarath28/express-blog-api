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

- [User](#User-API-Reference)

  - [Get my profile](#Get-my-profile)
  - [Get all users](#Get-all-users)
  - [View a user profile Count](#View-a-user-profile)
  - [Following a user](#Following-a-user)
  - [UnFollowing-a-user](#UnFollowing-a-user)
  - [Update user password](#Update-user-password)
  - [Update your profile](#Update-your-profile)
  - [Block another user](#Block-another-user)
  - [Unblock another user](#Unblock-another-user)
  - [Admin blocking a user](#Admin-blocking-a-user)
  - [Admin Unblocking a user](#Admin-Unblocking-a-user)
  - [Delete your account](#Delete-your-account)
  - [Upload Profile Photo](#Upload-Profile-Photo)

- [Post](#Post-API-Reference)
  - [Create Post](#Create-Post)
  - [Get All Posts](#Get-All-Posts)
  - [Get Single Post](#Get-Single-Post)
  - [Toggle Post like](#Toggle-Post-like)
  - [Toggle Post dislike](#Toggle-Post-dislike)
  - [Update Post](#Update-Post)
  - [Delete Post](#Delete-Post)

-[Comments](#Comment-API-Reference)

- [Create comment](#Create-comment)
- [Update comment](#Update-comment)
- [Delete comment](#Delete-comment)

-[Category](#Category-API-Reference)

- [Create category](#Create-category)
- [Get a single category](#Get-a-single-category)
- [Get all category](#Get-all-category)
- [Update category](#Update-category)
- [Delete category](#Delete-category)

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

# User API Reference

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

# Post API Reference

## Create Post

```
POST: /api/v1/posts/
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | Yes      |
| `title`          | `string` | Post title         | Yes      |
| `description`    | `string` | Post description   | Yes      |
| `category`       | `string` | ID of the category | Yes      |
| `photo`          | `string` | Image of the post  | Yes      |

Example request body:

```
{
  "title":"post_title",
  "description":"post_description",
  "category":"post_category",
  "photo":"post_photo",
}
```

## Get all posts

```
GET: /api/v1/posts/
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | No       |

## Get a single post

```
GET: /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | Yes      |
| `id            ` | `string` | ID of the post | Yes      |

## Toggle post like

```
GET: /api/v1/posts/likes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | Yes      |
| `id            ` | `string` | ID of the post | Yes      |

## Toggle post dislike

```
GET: /api/v1/posts/dislikes/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | Yes      |
| `id            ` | `string` | ID of the post | Yes      |

## Update Post

```
PUT: /api/v1/posts/:id
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | Yes      |
| `id`             | `string` | ID of the post     | Yes      |
| `title`          | `string` | Post title         | Yes      |
| `description`    | `string` | Post description   | Yes      |
| `category`       | `string` | ID of the category | Yes      |
| `photo`          | `string` | Image of the post  | Yes      |

Example request body:

```
{
  "title":"post_title",
  "description":"post_description",
  "category":"post_category",
  "photo":"post_photo",
}
```

## Delete post

```
DELETE: /api/v1/posts/:id
```

| Parameter        | Type     | Description    | Required |
| :--------------- | :------- | :------------- | :------- |
| `authentication` | `string` | Your token     | Yes      |
| `id            ` | `string` | ID of the post | Yes      |

# Comment API Reference

## Create comment

```
POST /api/v1/comments/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | Yes      |
| `id            ` | `string` | ID of the comment | Yes      |

## Update comment

```
PUT /api/v1/comments/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | Yes      |
| `id            ` | `string` | ID of the comment | Yes      |

## Delete comment

```
DELETE /api/v1/comments/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :---------------- | :------- |
| `authentication` | `string` | Your token        | Yes      |
| `id            ` | `string` | ID of the comment | Yes      |

# Category API Reference

## Create category

```
POST /api/v1/category/
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | Yes      |

Example request body:

```
{
  "title":"category_title"
}
```

## Get a single category

```
GET /api/v1/category/:id
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | No       |
| `id`             | `string` | ID of the category | Yes      |

## Get all category

```
GET /api/v1/category/
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | No       |

## Update a category

```
POST /api/v1/category/
```

| Parameter        | Type     | Description        | Required |
| :--------------- | :------- | :----------------- | :------- |
| `authentication` | `string` | Your token         | Yes      |
| `id`             | `string` | ID of the category | Yes      |

Example request body:

```
{
  "title":"category_title"
}
```

## Delete a category

```
DELETE /api/v1/category/:id
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | Yes      |
