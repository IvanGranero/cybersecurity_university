# cybersecurity_university
## NoSQL Injection
SQL or NoSQL injection is an attack to a vulnarable website via javascript injection or verb injection, which can be mitigated with a 
combination of validating the user supplied data, sanitizing the SQL or Mongo input and by setting javascriptEnabled to false in your mongod.conf

To demonstrate this common vulnerability this API has been developed providing an insecure loginurl as well as a secure version for it

let's login to our api with the user and incorrect password credentials

https://commusense.com/aggarwal/loginurl?user=user&password=notcorrect

returning a Username not valid message as expected, now let's request to login with the correct credentials

https://commusense.com/aggarwal/loginurl?user=user&password=userpass

With the user and password being valid the API will return the complete user information

Now let's demonstrate the vulnerability by injecting a not equal verb $ne so every comparison within the database will be true

https://commusense.com/aggarwal/loginurl?user=user&password[%24ne]=

With this injection the API will return all users's information from the database making the whole database vulnerable.

some of the lessons learned from the above are:

* Use POST instead of GET requests when passing credentials
* Hash and salt passwords
* Validate user input
* Sanitize queries

Now let's try an injection using a POST or PUT request by using the /changePassword provided by this API

With this vulnerability we will change the password for the first user in the database to any password we choose to, we only need to send a PUT request to
https://commusense.com/aggarwal/changePassword

and within the body of the request add the following JSON

{
  "username": {"$ne": 1},
  "password": "newHackedPassword"
}

when doing so, the first user encounter within the database will be updated to the password to "newHackedPassword" and the API will return the user data including the newly changed password.

for our example we have used POSTMAN which can be downloaded here:
https://www.postman.com/downloads/

The screenshot below shows the input provided into POSTMAN

<img width="844" alt="Screen Shot 2021-12-24 at 7 36 35 PM" src="https://user-images.githubusercontent.com/47937620/147375557-f7eb16c9-2366-47b3-879d-e5fde53f727b.png">

Let's now try the same injection with a sanitized API provided within https://commusense.com/aggarwal/changePasswordSanitize

<img width="843" alt="Screen Shot 2021-12-24 at 7 39 09 PM" src="https://user-images.githubusercontent.com/47937620/147375586-cc88432d-6357-4234-a1f6-357b4eb27c86.png">

in this case the injection has been mitigated and the database is no longer vulnarable.

Note: The same API can be used to demonstrate User Enumaration however is not covered within this README.


