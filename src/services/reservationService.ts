import API_URL from "../config/apiUrl";

const getReservation = async () => {
    try {
        const url = API_URL + `/reservations`;

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!data.ok) {
            console.error('Failed to fetch reservations data:', data.statusText);
            return [];
        }

        const result = await data.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching reservations data:', error);
        return [];
    }       
}

const createReservation = async (bookId: number) => {
    try {
        const url = API_URL + '/reservations';

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({ book_id: bookId })
        });

        if (!data.ok) {
            console.error('Failed to create reservation:', data.statusText);
            return null;
        }

        const result = await data.json();
        return result.data;
    } catch (error) {
        console.log('Error creating reservation:', error);
        return null;
    }
}

export { getReservation, createReservation };