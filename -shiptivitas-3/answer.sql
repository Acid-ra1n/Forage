-- TYPE YOUR SQL QUERY BELOW

-- PART 1: Create a SQL query that maps out the daily average users before and after the feature change
WITH user_activity_dates AS (
    SELECT
        user_id,
        activity_timestamp,
        CASE
            WHEN activity_timestamp < '2018-06-02' THEN 'Before'
            ELSE 'After'
        END AS feature_change_period
    FROM
        user_activity
)
SELECT
    feature_change_period,
    DATE(activity_timestamp) AS date,
    COUNT(DISTINCT user_id) AS daily_active_users
FROM
    user_activity_dates
GROUP BY
    feature_change_period,
    DATE(activity_timestamp)
ORDER BY
    feature_change_period,
    DATE(activity_timestamp);

-- PART 2: Create a SQL query that indicates the number of status changes by card
SELECT
    card_id,
    status,
    COUNT(*) AS status_changes
FROM
    card_status_changes
GROUP BY
    card_id,
    status
ORDER BY
    card_id,
    status;

