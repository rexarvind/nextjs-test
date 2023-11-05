
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const hour = date.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedDate = hours + ':' + minutes + ' ' + ampm + ', ' + day + ' ' + month + ' ' + year;
    return formattedDate;
}
