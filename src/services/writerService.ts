import API_URL from "../config/apiUrl";

const getAllWriters = async () => {
    try {
        const url = API_URL + '/writers';
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });
        if (!data.ok) {
            console.error('Failed to fetch all writers:', data.statusText);
            return [];
        }
        const result = await data.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching all writers:', error);
        return [];
    }
}

export { getAllWriters };