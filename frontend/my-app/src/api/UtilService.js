class UtilService {

    showDifferenceTime = (startDate, endDate) => {
        if (startDate !== null && endDate !== null) {
            return this.toHoursAndMinutes(endDate.diff(startDate, "minutes"))
        } else
            return 'not selected';
    }

    toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours + "h " + minutes + "m";
    }

    getPriorityColor = (name) => {
        switch (name) {
            case "LOW":
                return "#2ffa02"
            case "MEDIUM":
                return "#ffe900"
            case "HIGH":
                return "#ff0000"
            default:
                return "#111111"
        }
    }

    getPriorityName = (name) => {
        return name.charAt(0) + name.substring(1).toLowerCase()
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default new UtilService();