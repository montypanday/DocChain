DELIMITER //
DROP PROCEDURE IF EXISTS usp_record_action_return_hash;
CREATE PROCEDURE usp_record_action_return_hash
  (
    IN
    ActionTime DATETIME,
    FileID VARCHAR(64),
    StoragePlatform VARCHAR(20),
    ActionType VARCHAR(20),
    UserName VARCHAR(32),
    UserEmail VARCHAR(32),
    FileHash VARCHAR(64)
  )

  BEGIN

    INSERT INTO fileactions VALUES (ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash);

    SELECT MD5(concat(ActionTime, FileID, StoragePlatform, ActionType, UserName, UserEmail, FileHash)) AS RowHash;
  END //