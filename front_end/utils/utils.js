
const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for YYYY-MM-DD format
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;

    return dateString === date.toISOString().split('T')[0];
};

export {
    validateDate
}