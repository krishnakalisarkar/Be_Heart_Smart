ALTER TABLE bmi_status
RENAME id to tbl_id;

SELECT * FROM cardio_cleaned;
SELECT * FROM bmi_status;

SELECT *
INTO cardio_combined
FROM cardio_cleaned
INNER JOIN bmi_status
ON cardio_cleaned.id = bmi_status.tbl_id;

SELECT * FROM cardio_combined;

ALTER TABLE cardio_combined
DROP COLUMN tbl_id;