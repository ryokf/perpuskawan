import API_URL from "../config/apiUrl";

const getLoansData = async () => {
    try {
        const url = API_URL + '/loans';

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!data.ok) {
            console.error('Failed to fetch loans data:', data.statusText);
            return [];
        }

        const result = await data.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching loans data:', error);
        return [];
    }       
}

const getAllLoans = async () => {
    try {
        const url = API_URL + '/loans';

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });
        if (!data.ok) {
            console.error('Failed to fetch all loans:', data.statusText);
            return [];
        }
        const result = await data.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching all loans:', error);
        return [];
    }
}

const createLoan = async (bookId: number) => {
    try {
        const url = API_URL + '/loans';

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
            console.error('Failed to create loan:', data.statusText);
            return null;
        }

        const result = await data.json();
        return result.data;
    } catch (error) {
        console.log('Error creating loan:', error);
        return null;
    }
}

export { getLoansData, getAllLoans, createLoan };