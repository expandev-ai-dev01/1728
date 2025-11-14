import { getPool } from '@/instances/database';
import { NoteCreateRequest, NoteCreateResponse } from '@/services/note/noteTypes';

/**
 * @summary Creates a new note
 * @description Executes stored procedure to create a note with validation
 *
 * @function noteCreate
 * @module note
 *
 * @param {NoteCreateRequest} params - Note creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.title - Note title
 * @param {string} params.content - Note content
 *
 * @returns {Promise<NoteCreateResponse>} Created note identifier
 *
 * @throws {Error} When required parameters are missing
 * @throws {Error} When title exceeds maximum length
 * @throws {Error} When user does not exist
 * @throws {Error} When database operation fails
 *
 * @example
 * const note = await noteCreate({
 *   idAccount: 1,
 *   idUser: 123,
 *   title: 'Meeting Notes',
 *   content: 'Discussed project timeline and deliverables'
 * });
 */
export async function noteCreate(params: NoteCreateRequest): Promise<NoteCreateResponse> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('idUser', params.idUser)
    .input('title', params.title)
    .input('content', params.content)
    .execute('[functional].[spNoteCreate]');

  return result.recordset[0];
}
