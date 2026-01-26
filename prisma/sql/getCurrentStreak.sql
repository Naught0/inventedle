-- @param {String} :userId
WITH results AS (
    SELECT
        result.created_at,
        JULIANDAY(DATE(result.created_at)) - ROW_NUMBER() OVER (ORDER BY result.created_at) AS streak_id
    FROM
        result AS result
    LEFT JOIN 
        invention_of_the_day AS iotd ON iotd.id = result.iotd_id
    WHERE
        result.user_id = :userId
        AND DATE(result.created_at) = DATE(iotd.created_at)
        AND result.win = 1
),
streaks AS (
    SELECT
        COUNT(*) AS streak,
        streak_id
    FROM
        results
    GROUP BY
        streak_id
)
SELECT
    streak
FROM
    streaks
ORDER BY
    streak_id DESC
LIMIT 1;
