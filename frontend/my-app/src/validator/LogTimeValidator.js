class LogTimeValidator {

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

    // StartDate errors
    validateStartDate(startDate) {
        let error = "";
        if (startDate === null) {
            error = 'start date cannot be empty!';
        }
        return error
    }

    // EndDate errors
    validateEndDate(endDate) {
        let error = "";
        if (endDate === null) {
            error = 'end date cannot be empty!';
        }
        return error
    }

    validateAll(description, startDate, endDate) {
        let descriptionError = this.validateDescription(description)
        let startDateError = this.validateStartDate(startDate)
        let endDateError = this.validateEndDate(endDate)

        return {
            descriptionError,
            startDateError,
            endDateError,
        }
    }

}

export default new LogTimeValidator()