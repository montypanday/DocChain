CREATE PROCEDURE usp_record_action_return_hash
  @ActionTime DATETIME,
  @FileID     VARCHAR(64),
  @StoragePlatform  VARCHAR(20),
  @ActionType   VARCHAR(20),
  @UserName     VARCHAR(64),
  @UserEmail    VARCHAR(64),
  @FileHash     VARCHAR(64)

AS

INSERT INTO fileactions VALUES (@ActionTime, @FileID, @StoragePlatform, @ActionType, @UserName, @UserEmail, @FileHash);

SELECT sys.fn_sqlvarbasetostr(HASHBYTES('MD5', CONCAT(@ActionTime, @FileID, @StoragePlatform, @ActionType, @UserName, @UserEmail, @FileHash))) AS RowHash;

GO