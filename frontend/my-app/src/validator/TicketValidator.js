class TicketValidator {

    // Title errors
    validateTitle(title) {
        let error = "";
        if (!title || title === '') {
            error = 'title cannot be empty!';
        } else if (title.length < 2) {
            error = 'title is too short!';
        } else if (title.length > 25) {
            error = 'title is too long!';
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

    validateAll(title, description, projectStatus, priority, expiryDate) {
        let titleError = this.validateTitle(title)
        let descriptionError = this.validateDescription(description)
        let projectStatusError = this.validateProjectStatus(projectStatus)
        let priorityError = this.validatePriority(priority)
        let expiryDateError = this.validateExpiryDate(expiryDate)

        return {
            titleError,
            descriptionError,
            projectStatusError,
            priorityError,
            expiryDateError
        }
    }

}

export default new TicketValidator()