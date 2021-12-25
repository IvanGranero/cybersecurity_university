# cybersecurity_university
## NoSQL Injection
SQL or NoSQL injection is a vulnerability of a web site via javascript injection or verb injection, which can be mitigated with a 
combination of validating the user supplied data, sanitizing the SQL or Mongo input and by setting javascriptEnabled to false in your mongod.conf

To demonstrate this common vulnerability this API has been developed providing an insecure loginurl as well as a secure version for it

let's login to our api with the user and userpass credentials

https://commusense.com/aggarwal/loginurl?user=user&password=userpass

In this example if the user and password are valid the API will return the complete user information

Now let's demonstrate the vulnerability by injecting a not equal verb $ne so every comparison within the database will be true

https://commusense.com/aggarwal/loginurl?user=user&password[%24ne]=

With this injection the API will return all users's information from the database making the whole database vulnerable.

some of the lessons learned from the above are:

* To not use get requests when passing credentials
* To hash and salt passwords
* To validate user input
* To sanitize queries

Now let's try an injection using a POST or PUT request by using the /changePassword provided by this API

With this vulnerability we will change the password for the first user in the database to any password we choose to, we only need to send a PUT request to
https://commusense.com/aggarwal/changePassword

and within the body of the request add the following JSON

{
  "username": {"$ne": 1},
  "password": "newHackedPassword"
}

when doing so, the first user encounter within the database will update the password to "newHackedPassword".

for our example we used POSTMAN
https://www.postman.com/downloads/



....

... it also works for POST requests!

