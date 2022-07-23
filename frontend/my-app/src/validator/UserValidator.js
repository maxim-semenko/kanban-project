class UserValidator {

    // Firstname errors
    validateFirstname(firstname) {
        let error = "";
        if (!firstname || firstname === '') {
            error = 'firstname cannot be empty!';
        } else if (firstname.length < 2) {
            error = 'firstname is too short!';
        } else if (firstname.length > 30) {
            error = 'firstname is too long!';
        }
        return error
    }

    // Lastname errors
    validateLastname(lastname) {
        let error = "";
        if (!lastname || lastname === '') {
            error = 'lastname cannot be empty!';
        } else if (lastname.length < 2) {
            error = 'lastname is too short!';
        } else if (lastname.length > 30) {
            error = 'lastname is too long!';
        }
        return error
    }

    // Username errors
    validateUsername(username) {
        let error = "";
        if (!username || username === '') {
            error = 'username cannot be empty!';
        } else if (username.length < 2) {
            error = 'username is too short!';
        } else if (username.length > 30) {
            error = 'username is too long!';
        }
        return error
    }

    // Email errors
    validateEmail(email) {
        let error = "";
        if (!email || email === '') {
            error = 'email cannot be empty!';
        } else if (email.length < 4) {
            error = 'email is too short!';
        } else if (email.length > 40) {
            error = 'email is too long!';
        }
        return error
    }

    // Password errors
    validatePassword(password) {
        let error = "";
        if (!password || password === '') {
            error = 'password cannot be empty!';
        } else if (password.length < 8) {
            error = 'password is too short!';
        } else if (password.length > 256) {
            error = 'password is too long!';
        }
        return error
    }

    // About errors
    validateAbout(about) {
        let error = "";
        if (about || about !== '') {
            if (about.length < 2) {
                error = 'about is too short!';
            } else if (about.length > 256) {
                error = 'about is too long!';
            }
            return error
        }
    }

    validateAllWithoutPassword(firstname, lastname, username, email) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let usernameError = this.validateUsername(username)
        let emailError = this.validateEmail(email)

        return {
            firstnameError,
            lastnameError,
            usernameError,
            emailError
        }
    }

    validateAllForSignUp(firstname, lastname, username, email, password) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let usernameError = this.validateUsername(username)
        let emailError = this.validateEmail(email)
        let passwordError = this.validatePassword(password)

        return {
            firstnameError,
            lastnameError,
            usernameError,
            emailError,
            passwordError
        }
    }

    validateAllForSignIn(username, password) {
        let usernameError = this.validateUsername(username)
        let passwordError = this.validatePassword(password)

        return {
            usernameError,
            passwordError
        }
    }

    validateForEditUser(firstname, lastname, username, email, about) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let usernameError = this.validateUsername(username)
        let emailError = this.validateEmail(email)
        let aboutError = this.validateAbout(about)

        return {
            firstnameError,
            lastnameError,
            usernameError,
            emailError,
            aboutError
        }
    }

}

export default new

UserValidator()