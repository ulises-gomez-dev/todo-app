export const fetchTodos = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        return await response.json();
    }

    catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}