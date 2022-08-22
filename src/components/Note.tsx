import React, { useState } from 'react';
import styled from 'styled-components';

export interface NoteProps {
  id: number;
  text: string;
}

const NoteWrapper = styled.div`
  background-color: rgba(137, 196, 244, 0.3);
  border: 1px solid gray;
  border-radius: 10px;
  padding: 1rem;
  min-height: 70px;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap;
  margin: 12px 0;
`;

const NoteId = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 18px;
  padding: 8px 0;
`;

const NoteContent = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 16px;
  padding: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Note = ({ id, text }: NoteProps) => {
  return (
    <NoteWrapper>
      <NoteId>{id}</NoteId>
      <NoteContent>{text}</NoteContent>
    </NoteWrapper>
  );
};

export default Note;
