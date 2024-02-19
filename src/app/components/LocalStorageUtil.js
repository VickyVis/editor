

const LOCAL_STORAGE_KEY = 'editorContent';

const saveContent = (content) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
};

const getSavedContent = () => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedContent ? JSON.parse(savedContent) : null;
};

export default {
    saveContent,
    getSavedContent,
};
