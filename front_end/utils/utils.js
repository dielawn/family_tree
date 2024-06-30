const validateDate = (dateString) => {
    const regex = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$/; // Regular expression for ISO 8601 format
    const isoDateString = new Date(dateString).toISOString();
    if (!regex.test(isoDateString)) return false;

    const date = new Date(isoDateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;

    return isoDateString === date.toISOString().split('T')[0];
};

export default validateDate;