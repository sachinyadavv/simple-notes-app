import React, { useState } from 'react';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import Note from './components/Note';
import NewNote from './components/NewNote';
import styled from 'styled-components';

interface NotesInventory {
  id: number;
  text: string;
}

interface NotesData {
  notes: NotesInventory[];
}

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      text
    }
  }
`;

const AppWrapper = styled.div`
  max-width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  min-height: 100vh;
`;

function DisplayNotes() {
  const { loading, error, data } = useQuery<NotesData>(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data?.notes.map(({ id, text }) => (
        <Note id={id} text={text} />
      ))}
    </>
  );
}

const SAVE_NOTE = gql`
  mutation insert_notes_one($text: String!) {
    insert_notes_one(
      object: { text: $text }
      on_conflict: { constraint: notes_pkey }
    ) {
      id
      text
    }
  }
`;

function App() {
  const [saveNote, { data, loading, error }] = useMutation(
    SAVE_NOTE,
    {
      refetchQueries: [
        { query: GET_NOTES }, // DocumentNode object parsed with gql
        'GetNotes', // Query name
      ],
    },
  );

  const [searchString, setSearchString] = useState<string>();

  return (
    <AppWrapper>
      <h2>Auctree Diary 🚀</h2>
      <NewNote
        onSave={(text) => {
          saveNote({
            variables: {
              text: text,
            },
          });
        }}
      ></NewNote>
      <DisplayNotes />
    </AppWrapper>
  );
}

export default App;
