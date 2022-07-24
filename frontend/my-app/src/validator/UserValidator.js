class UserValidator {

    // Firstname errors
    validateFirstname(firstname) {
        let error = "";
        if (!firstname || firstname === '') {
            error = 'firstname cannot be empty!';
        } else if (firstname.length < 2) {
            error = 'firstname is too short!';
        } else if (firstname.length > 50) {
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
        } else if (lastname.length > 50) {
            error = 'lastname is too long!';
        }
        return error
    }

    // speciality errors
    validateSpeciality(speciality) {
        let error = "";
        if (!speciality || speciality === '') {
            error = 'speciality cannot be empty!';
        } else if (speciality.length < 2) {
            error = 'speciality is too short!';
        } else if (speciality.length > 50) {
            error = 'speciality is too long!';
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
        } else if (email.length > 50) {
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


    validateAllWithoutPassword(firstname, lastname, speciality, email) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let specialityError = this.validateSpeciality(speciality)
        let emailError = this.validateEmail(email)

        return {
            firstnameError,
            lastnameError,
            specialityError,
            emailError
        }
    }

    validateAllForSignUp(firstname, lastname, speciality, email, password) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let specialityError = this.validateSpeciality(speciality)
        let emailError = this.validateEmail(email)
        let passwordError = this.validatePassword(password)

        return {
            firstnameError,
            lastnameError,
            specialityError,
            emailError,
            passwordError
        }
    }

    validateAllForSignIn(email, password) {
        let emailError = this.validateEmail(email)
        let passwordError = this.validatePassword(password)

        return {
            emailError,
            passwordError
        }
    }

    validateForEditUser(firstname, lastname, email, speciality) {
        let firstnameError = this.validateFirstname(firstname)
        let lastnameError = this.validateLastname(lastname)
        let emailError = this.validateEmail(email)
        let specialityError = this.validateSpeciality(speciality)

        return {
            firstnameError,
            lastnameError,
            emailError,
            specialityError
        }
    }

}

export default new

UserValidator()