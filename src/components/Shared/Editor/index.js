import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import './editorToolbarcss.css';

import c from '../shared.Module.scss';
import classNames from 'classnames';
import { stateToHTML } from 'draft-js-export-html';

const CustomEditor = ({ onChange, setRaw }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const html = stateToHTML(editorState.getCurrentContent());
    onChange(html);
    const raw = convertToRaw(editorState.getCurrentContent());
    setRaw(raw?.blocks[0]?.text);
  }, [editorState]);

  return (
    <div className="p-1">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName={classNames(c.toolbarclass)}
        editorClassName={classNames(c.editorClass)}
        toolbar={{
          options: [
            'inline',
            'blockType',
            // 'fontSize',
            // 'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            // 'history',
          ],
        }}
      />
    </div>
  );
};

export default CustomEditor;
