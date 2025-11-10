import { CreateUserData, ListNotesData, UpdateNoteData, UpdateNoteVariables, DeleteNoteData, DeleteNoteVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListNotes(options?: useDataConnectQueryOptions<ListNotesData>): UseDataConnectQueryResult<ListNotesData, undefined>;
export function useListNotes(dc: DataConnect, options?: useDataConnectQueryOptions<ListNotesData>): UseDataConnectQueryResult<ListNotesData, undefined>;

export function useUpdateNote(options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;
export function useUpdateNote(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;

export function useDeleteNote(options?: useDataConnectMutationOptions<DeleteNoteData, FirebaseError, DeleteNoteVariables>): UseDataConnectMutationResult<DeleteNoteData, DeleteNoteVariables>;
export function useDeleteNote(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteNoteData, FirebaseError, DeleteNoteVariables>): UseDataConnectMutationResult<DeleteNoteData, DeleteNoteVariables>;
