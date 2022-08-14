class ProjectStatusValidator {

    // Firstname errors
    validateName(name) {
        let error = "";
        if (!name || name === '') {
            error = 'name cannot be empty!';
        } else if (name.length < 2) {
            error = 'name is too short!';
        } else if (name.length > 50) {
            error = 'name is too long!';
        }
        return error
    }

    // Limit errors
    validateLimit(limit) {
        let error = "";
        if (!limit || limit === '') {
            error = 'limit cannot be empty!';
        } else if (limit < 1) {
            error = 'limit is too short!';
        } else if (limit > 100) {
            error = 'limit is too long!';
        }
        return error
    }


    validateAll(name, limit) {
        let nameError = this.validateName(name)
        let limitError = this.validateLimit(limit)

        return {
            nameError,
            limitError,
        }
    }

}

export default new ProjectStatusValidator()