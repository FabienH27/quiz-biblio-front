let store: Record<string, string | null> = {};

export const mockLocalStorage = {
    getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = value;
    },
    removeItem: (key: string) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    }
};