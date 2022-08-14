class ProjectValidator {

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

    // description errors
    validateDescription(description) {
        let error = "";
        if (!description || description === '') {
            error = 'description cannot be empty!';
        } else if (description.length < 2) {
            error = 'description is too short!';
        } else if (description.length > 2048) {
            error = 'description is too long!';
        }
        return error
    }

    validateAll(name, description) {
        let nameError = this.validateName(name)
        let descriptionError = this.validateDescription(description)

        return {
            nameError,
            descriptionError,
        }
    }

}

export default new ProjectValidator()