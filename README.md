# cybersecurity_university
NoSQL Injection
SQL or NoSQL injection is a vulnerability of a web site via javascript injection or verb injection, which can be mitigated with a 
combination of validating the user supplied data, sanitizing the SQL or Mongo input and by setting javascriptEnabled to false in your mongod.conf

To demonstrate this common vulnerability this API has been developed providing an insecure loginurl as well as a secure version for it

let's login to our api with the user and userpass credentials

https://commusense.com/aggarwal/loginurl?user=user&password=userpass

In this example if the user and password are valid the API will return the complete user information

Now let's demonstrate the vulnerability by injecting a not equal verb $ne so every comparison within the database will be true

https://commusense.com/aggarwal/loginurl?user=user&password[%24ne]=

In this example it will return not only the user input but all the registers within the database.


... it also works for POST requests!

