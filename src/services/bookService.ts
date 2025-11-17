import type { Book } from '../types/Book';
import API_URL from '../config/apiUrl';

const fetchBookData = async (categoryId: number): Promise<Book[]> => {
    try {
        const data = await fetch(API_URL + '/books?category_id=' + categoryId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6InJ5byIsInN0YXR1cyI6Im1lbWJlciIsImlhdCI6MTc2MzM0NTQ1NywiZXhwIjoxNzYzOTUwMjU3fQ.d2V35EW7veTMaeMeG8IY3UNTmm9efzzMnlhyzIxsPHA`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!data.ok) {
            console.error('Failed to fetch book data:', data.statusText);
            return [];
        }

        const result = await data.json();
        console.log('Fetched book data:', result);
        
        // Handle different response formats
        if (Array.isArray(result)) {
            return result;
        }
        
        if (result.data && Array.isArray(result.data)) {
            return result.data;
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

export { fetchBookData };