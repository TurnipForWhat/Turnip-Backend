# Signing up

POST /signup
{
	name: String,
	email: String,
	[optional password: String], *
	[optional fbid: Integer],
}
* if an FBID is not provided, a password must be provided as well
>> { success: Boolean, login_token: String }

# Logging in

POST /login
{
	name: String,
	password: String,
}
>> { success: Boolean, login_token: String }

# Setting status

POST /toggle
{
	status: Boolean // True when ready to turn up, false when cancelled
}

POST /interests
{
	activites: [integer] // Integer array of possible activites
	anti_activities: [integer] // Integer array of possible negative activites
}

# Searching for users

GET /search?query=String
>> [user_id]

# User profile

GET /user/:user_id
>> { User }

# Chat

POST /chat/:chat_id
{ message: String }
>> { success: Boolean }

GET /chat/:chat_id/?last=mesage_id
>> { new_messages: Boolean, messages: [message] }

POST /chat
{ users: [user_id }
>> { success: Boolean }

# Friends

POST /friend/request/:user_id
>> { success: Boolean }

DELETE /friend/request/:user_id
>> { success: Boolean }

# Main feed

GET /feed
>> { friends: [User], status: boolean }

# Profile management

POST /profile/picture
{ picture: base64_image }
>> { success: Boolean }

POST /profile
{ User }
>> { success: Boolean }

POST /user/:user_id/block
>> { success: Boolean }

DELETE /user/:user_id/block
>> { success: Boolean }

POST /user/invite
{ email: String }
>> { success: Boolean }


