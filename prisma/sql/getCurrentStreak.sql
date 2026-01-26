-- @param {String} :userId
SELECT COUNT(*) AS streak
FROM result
WHERE user_id = :userId
  AND win = 1
  AND id > COALESCE((
    SELECT id
    FROM result
    WHERE user_id = :userId AND win = 0
    ORDER BY id DESC
    LIMIT 1
  ), 0);
