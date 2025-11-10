import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteNoteData {
  note_delete?: Note_Key | null;
}

export interface DeleteNoteVariables {
  id: UUIDString;
}

export interface ListNotesData {
  notes: ({
    id: UUIDString;
    title: string;
    content: string;
  } & Note_Key)[];
}

export interface NoteTag_Key {
  noteId: UUIDString;
  tagId: UUIDString;
  __typename?: 'NoteTag_Key';
}

export interface Note_Key {
  id: UUIDString;
  __typename?: 'Note_Key';
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface UpdateNoteData {
  note_update?: Note_Key | null;
}

export interface UpdateNoteVariables {
  id: UUIDString;
  content: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNotesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListNotesData, undefined>;
  operationName: string;
}
export const listNotesRef: ListNotesRef;

export function listNotes(): QueryPromise<ListNotesData, undefined>;
export function listNotes(dc: DataConnect): QueryPromise<ListNotesData, undefined>;

interface UpdateNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  operationName: string;
}
export const updateNoteRef: UpdateNoteRef;

export function updateNote(vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;
export function updateNote(dc: DataConnect, vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface DeleteNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
  operationName: string;
}
export const deleteNoteRef: DeleteNoteRef;

export function deleteNote(vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;
export function deleteNote(dc: DataConnect, vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

