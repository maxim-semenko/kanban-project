class TaskValidator {

    // Name errors
    validateName(name) {
        let error = "";
        if (!name || name === '') {
            error = 'name cannot be empty!';
        } else if (name.length < 2) {
            error = 'name is too short!';
        } else if (name.length > 12) {
            error = 'name is too long!';
        }
        return error
    }

    // Description errors
    validateDescription(description) {
        let error = "";
        if (!description || description === '') {
            error = 'description cannot be empty!';
        } else if (description.length < 2) {
            error = 'description is too short!';
        } else if (description.length > 1024) {
            error = 'description is too long!';
        }
        return error
    }

    // ProjectStatus errors
    validateProjectStatus(projectStatus) {
        let error = "";
        if (projectStatus === null) {
            error = 'projectStatus cannot be empty!';
        }
        return error
    }

    // Priority errors
    validatePriority(priority) {
        let error = "";
        if (priority === null) {
            error = 'priority cannot be empty!';
        }
        return error
    }

    // ExpiryDate errors
    validateExpiryDate(expiryDate) {
        let error = "";
        if (expiryDate === null) {
            error = 'expiryDate cannot be empty!';
        }
        return error
    }

    validateAll(name, description, projectStatus, priority, expiryDate) {
        let nameError = this.validateName(name)
        let descriptionError = this.validateDescription(description)
        let projectStatusError = this.validateProjectStatus(projectStatus)
        let priorityError = this.validatePriority(priority)
        let expiryDateError = this.validateExpiryDate(expiryDate)

        return {
            nameError,
            descriptionError,
            projectStatusError,
            priorityError,
            expiryDateError
        }
    }

}

export default new TaskValidator()