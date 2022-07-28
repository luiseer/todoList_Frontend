export const formatDate = date => {
    const dateFormatted = new Date(date.split('T')[0].split('-'));
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return dateFormatted.toLocaleDateString('en-US', options);
}