var express = require('express');
const app = express();
const PORT = process.env.port || 4700;
const controller = require('./src/controller');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/loginurl', controller.loginurl);

app.post('/login', controller.login);

app.post('/register', controller.register);

app.put('/changePassword', controller.changePassword);

app.put('/changePasswordSanitize', controller.changePasswordSanitize);

app.delete('/deleteUser', controller.deleteUser);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});