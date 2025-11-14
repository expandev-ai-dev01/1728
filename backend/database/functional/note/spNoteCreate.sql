/**
 * @summary
 * Creates a new note with title and content for the authenticated user.
 * Automatically generates creation and modification timestamps.
 *
 * @procedure spNoteCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/internal/note
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy isolation
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier who is creating the note
 *
 * @param {NVARCHAR(255)} title
 *   - Required: Yes
 *   - Description: Title of the note (max 255 characters)
 *
 * @param {NVARCHAR(MAX)} content
 *   - Required: Yes
 *   - Description: Content of the note (supports rich text)
 *
 * @returns {INT} idNote - Identifier of the created note
 *
 * @testScenarios
 * - Valid creation with all required parameters
 * - Validation failure when title is empty
 * - Validation failure when title exceeds 255 characters
 * - Validation failure when content is empty
 * - Validation failure when user is not authenticated
 * - Transaction rollback on database error
 */
CREATE OR ALTER PROCEDURE [functional].[spNoteCreate]
  @idAccount INTEGER,
  @idUser INTEGER,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter: idAccount
   * @throw {idAccountRequired}
   */
  IF (@idAccount IS NULL)
  BEGIN
    ;THROW 51000, 'idAccountRequired', 1;
  END;

  /**
   * @validation Validate required parameter: idUser
   * @throw {idUserRequired}
   */
  IF (@idUser IS NULL)
  BEGIN
    ;THROW 51000, 'idUserRequired', 1;
  END;

  /**
   * @validation Validate required parameter: title
   * @throw {titleRequired}
   */
  IF (@title IS NULL OR LTRIM(RTRIM(@title)) = '')
  BEGIN
    ;THROW 51000, 'titleRequired', 1;
  END;

  /**
   * @validation Validate title length
   * @throw {titleExceedsMaximumLength}
   */
  IF (LEN(@title) > 255)
  BEGIN
    ;THROW 51000, 'titleExceedsMaximumLength', 1;
  END;

  /**
   * @validation Validate required parameter: content
   * @throw {contentRequired}
   */
  IF (@content IS NULL OR LTRIM(RTRIM(@content)) = '')
  BEGIN
    ;THROW 51000, 'contentRequired', 1;
  END;

  /**
   * @validation Verify user exists and belongs to account
   * @throw {userDoesNotExist}
   */
  IF NOT EXISTS (
    SELECT 1
    FROM [security].[user] usr
    WHERE usr.[idUser] = @idUser
      AND usr.[idAccount] = @idAccount
      AND usr.[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'userDoesNotExist', 1;
  END;

  DECLARE @idNote INTEGER;
  DECLARE @currentDateTime DATETIME2 = GETUTCDATE();

  BEGIN TRY
    /**
     * @rule {db-multi-tenancy-pattern} Insert note with account isolation
     */
    BEGIN TRAN;

      INSERT INTO [functional].[note] (
        [idAccount],
        [idUser],
        [title],
        [content],
        [dateCreated],
        [dateModified],
        [deleted]
      )
      VALUES (
        @idAccount,
        @idUser,
        @title,
        @content,
        @currentDateTime,
        @currentDateTime,
        0
      );

      SET @idNote = SCOPE_IDENTITY();

      /**
       * @output {NoteCreated, 1, 1}
       * @column {INT} idNote
       * - Description: Identifier of the created note
       */
      SELECT @idNote AS [idNote];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO