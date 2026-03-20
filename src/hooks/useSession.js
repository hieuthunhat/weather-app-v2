export const useSession = (key) => {
    function setSession(value) {
        console.log(value)
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    function getSession() {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    function deleteSession() {
        sessionStorage.removeItem(key);
    }

    return {
        getSession,
        setSession,
        deleteSession
    }
}