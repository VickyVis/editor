import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import LocalStorageUtil from './LocalStorageUtil';

const DraftEditor = () => {
    const [editorState, setEditorState] = useState(() => {
        const savedContent = LocalStorageUtil.getSavedContent();
        return savedContent ? EditorState.createWithContent(savedContent) : EditorState.createEmpty();
    });

    useEffect(() => {
        LocalStorageUtil.saveContent(editorState.getCurrentContent());
    }, [editorState]);

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const onEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    return (
        <div className="flex flex-col w-full">
            <Editor
                editorState={editorState}
                onChange={onEditorChange}
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    );
};

export default DraftEditor;
