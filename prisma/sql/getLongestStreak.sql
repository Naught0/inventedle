-- @param {String} :userId
WITH Gaps AS (
  SELECT 
    iotd_id,
    CASE 
      WHEN LAG(iotd_id) OVER (ORDER BY iotd_id) = iotd_id - 1 THEN 0 
      ELSE 1 
    END AS is_start
  FROM result
  WHERE user_id = :userId AND win = 1
),
Groups AS (
  SELECT 
    SUM(is_start) OVER (ORDER BY iotd_id) AS group_id
  FROM Gaps
)
SELECT COUNT(*) AS streak
FROM Groups
GROUP BY group_id
ORDER BY streak DESC
LIMIT 1;
