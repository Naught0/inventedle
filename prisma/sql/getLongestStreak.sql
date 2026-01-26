-- @param {String} :userId
WITH UserHistory AS (
  SELECT
    win,
    ROW_NUMBER() OVER (ORDER BY id) as row_num
  FROM result
  WHERE user_id = :userId
),
WinGroups AS (
  SELECT
    (row_num - ROW_NUMBER() OVER (ORDER BY row_num)) as group_id
  FROM UserHistory
  WHERE win = 1
)
SELECT COUNT(*) as streak
FROM WinGroups
GROUP BY group_id
ORDER BY streak DESC
LIMIT 1;

