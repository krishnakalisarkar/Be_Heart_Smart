SELECT *
INTO final_cardio_combined
FROM final_cardio_cleaned
INNER JOIN final_bmi_status
ON final_cardio_cleaned.tbl_id = final_bmi_status.tb_id;

ALTER TABLE final_cardio_combined
DROP COLUMN tb_id;

SELECT * FROM final_cardio_combined;

