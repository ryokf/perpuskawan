import API_URL from "../config/apiUrl";

const getAllCategories = async () => {
    const data = await fetch(API_URL + '/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6InJ5byIsInN0YXR1cyI6Im1lbWJlciIsImlhdCI6MTc2MzM0NTQ1NywiZXhwIjoxNzYzOTUwMjU3fQ.d2V35EW7veTMaeMeG8IY3UNTmm9efzzMnlhyzIxsPHA`,
            'ngrok-skip-browser-warning': 'true'
        }
    });

    if (!data.ok) {
        console.error('Failed to fetch categories:', data.statusText);
        return null;
    }

    const result = await data.json();
    console.log('Fetched categories:', result);
    return result.data;
}

export { getAllCategories };