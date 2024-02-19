
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import DraftEditor from './DraftEditor';
import LocalStorageUtil from './LocalStorageUtil';

const EditorComponent = () => {
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
        <div className="flex flex-col items-center">
            <Title />
            <Button label="Save" onClick={() => LocalStorageUtil.saveContent(editorState.getCurrentContent())} />
            <DraftEditor editorState={editorState} onEditorChange={onEditorChange} handleKeyCommand={handleKeyCommand} />
        </div>
    );
};

export default EditorComponent;

