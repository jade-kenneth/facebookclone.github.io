const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModel')

router.post('/signup', (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName,
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password
    })
    signedUpUser.save()
    .then(data => {
        response.json();
    })
    .catch(error => {
        response.json(error);
    })
})


module.exports = router