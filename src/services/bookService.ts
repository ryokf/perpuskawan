import type { Book, DetailBook } from '../types/Book';
import API_URL from '../config/apiUrl';
import type { Loan } from '../types/Loan';

const fetchBookData = async (categoryId: number, query: string): Promise<Book[]> => {
    try {
        let url;
        if(query === '') {
            url = API_URL + '/books?category_id=' + categoryId;
        }else{
            url = API_URL + '/books?category_id=' + categoryId + '&search=' + encodeURIComponent(query);
        }

        const data = await fetch(url, {
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

const getDetailBook = async (bookId: number): Promise<DetailBook | null> => {
    try {
        const url = API_URL + '/books/' + bookId;

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6InJ5byIsInN0YXR1cyI6Im1lbWJlciIsImlhdCI6MTc2MzM0NTQ1NywiZXhwIjoxNzYzOTUwMjU3fQ.d2V35EW7veTMaeMeG8IY3UNTmm9efzzMnlhyzIxsPHA`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!data.ok) {
            console.error('Failed to fetch book detail:', data.statusText);
            return null;
        }

        
        const result = await data.json();
        console.log(result.data.loans.length)
        const loanNotDone = result.data.loans.length > 0 
            ? result.data?.loans.map((loan: Loan) => {
                if (!loan.isDone) {
                    return 1;
                }
            }) 
            : 0;

        console.log('Loan not done count:', loanNotDone[0]);

        const queueCount = result.data?.reservations.length + loanNotDone[0];
        console.log('Queue count:', queueCount || 0);
        
        if (result && result.data) {
            return {
                ...result.data,
                queueCount: queueCount || 0
            } as DetailBook;
        }

        return null;
    } catch (error) {
        console.error('Error fetching book detail:', error);
        return null;
    }
}

export { fetchBookData, getDetailBook };