import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styled from 'styled-components';
import { NoteProps } from './Note';
import Button from '@mui/material/Button';

interface NewNoteProps {
  onSave: (text: string) => void;
}
const NoteWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 1rem;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap;
  margin: 12px 0;
`;

const NewNote = ({ onSave }: NewNoteProps) => {
  const [text, setText] = useState<string>();
  const limit = 180;

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const text = event.target.value;
    if (text && text.trim().length > 0) {
      setText(text);
    }
  };

  const isValidText = text && text.length <= limit;

  return (
    <NoteWrapper>
      <TextField
        id="outlined-multiline-static"
        label="Note Text (max 180 characters)"
        multiline
        rows={3}
        defaultValue={'Enter Note Text'}
        required
        onChange={handleTextChange}
        helperText={`characters remaining : ${
          text && text.length > 0
            ? text.length > limit
              ? 'overflow'
              : limit - text.length
            : limit
        }`}
      />
      <Button
        variant="contained"
        disabled={!isValidText}
        onClick={() => {
          if (isValidText) {
            onSave(text);
          }
        }}
      >
        Save Note
      </Button>
    </NoteWrapper>
  );
};

export default NewNote;
