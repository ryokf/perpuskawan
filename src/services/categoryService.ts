import API_URL from "../config/apiUrl";

const getAllCategories = async () => {
    const data = await fetch(API_URL + '/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'ngrok-skip-browser-warning': 'true'
        }
    });

    if (!data.ok) {
        console.error('Failed to fetch categories:', data.statusText);
        return null;
    }

    const result = await data.json();
    return result.data;
}

export { getAllCategories };