# Signing up

```
POST /signup
{
	name: String,
	email: String,
	[optional password: String], *
	[optional fbid: Integer],
}
>> { success: Boolean, login_token: String }
```

*if an FBID is not provided, a password must be provided as well

# Logging in

```
POST /login
{
	email: String,
	password: String,
}
>> { success: Boolean, login_token: String }
```

# Setting status

## Toggle current status

```
POST /toggle
{
	status: Boolean // True when ready to turn up, false when cancelled
}
>> { success: Boolean }
```

## Update current interests

```
POST /interests
{
	activites: [integer] // Integer array of possible activites
	anti_activities: [integer] // Integer array of possible negative activites
}
>> { success: Boolean }
```

# Searching for users

```
GET /search?query=String
>> [user_id]
```

# User profile

## Retrieve a user's profile

```
GET /user/:user_id
>> { User }
```

# Chat

## Send chat message

```
POST /chat/:chat_id
{ message: String }
>> { success: Boolean }
```

## Poll for new messages in a chat

```
GET /chat/:chat_id/?last=mesage_id
>> { new_messages: Boolean, messages: [message] }
```

## Start a new chat

```
POST /chat
{ users: [user_id }
>> { success: Boolean }
```

# Friends

POST /friend/request/:user_id
>> { success: Boolean }

DELETE /friend/request/:user_id
>> { success: Boolean }

# Main feed

GET /feed
>> { friends: [User], status: boolean }

# Profile management

## Upload profile picture

```
POST /profile/picture
{ picture: base64_image }
>> { success: Boolean }
```

## Update profile (name, password, email, etc)
```
POST /profile
{ User }
>> { success: Boolean }
```

## Block a user

```
POST /user/:user_id/block
>> { success: Boolean }
```

## Unblock a user

```
DELETE /user/:user_id/block
>> { success: Boolean }
```

## Invite a user

```
POST /user/invite
{ email: String }
>> { success: Boolean }
```

