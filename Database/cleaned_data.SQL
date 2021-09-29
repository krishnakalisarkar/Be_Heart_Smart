CREATE TABLE cardio_cleaned (
id numeric PRIMARY KEY,
Age numeric NOT NULL,
gender numeric NOT NULL,
height numeric NOT NULL,
weight numeric NOT NULL,
systolic_bp numeric NOT NULL,
diastolic_bp numeric NOT NULL,
cholesterol numeric NOT NULL,
glucose numeric NOT NULL,
smoker numeric NOT NULL,
alcohol_intake numeric NOT NULL,
active numeric NOT NULL,
cardio numeric NOT NULL
);
SELECT * FROM cardio_cleaned;
--=================================

CREATE TABLE cardio_cleaned_again (
id numeric PRIMARY KEY,
Age numeric NOT NULL,
gender numeric NOT NULL,
height numeric NOT NULL,
weight numeric NOT NULL,
systolic_bp numeric NOT NULL,
diastolic_bp numeric NOT NULL,
cholesterol numeric NOT NULL,
glucose numeric NOT NULL,
smoker numeric NOT NULL,
alcohol_intake numeric NOT NULL,
active numeric NOT NULL,
cardio_disease numeric NOT NULL
);
SELECT * FROM cardio_cleaned_again;
--=========================================

CREATE TABLE BMI (
id numeric PRIMARY KEY NOT NULL,
BMI numeric NOT NULL,
weight_status VARCHAR NOT NULL,
obesity_status VARCHAR NOT NULL
);
SELECT * FROM BMI;
--===========================================
-- Joining the two tables.
DROP TABLE cardio_complete;
SELECT c.id,
	c.age,
    c.gender,
	c.height,
    c.weight,
	c.systolic_bp,
	c.diastolic_bp,
	c.cholesterol,
	c.glucose,
	c.smoker,
	c.alcohol_intake,
	c.active,
	c.cardio_disease,
	b.bmi,
	b.weight_status,
	b.obesity_status
INTO cardio_complete
FROM cardio_cleaned_again AS c
INNER JOIN BMI AS b
ON (c.id = b.id);
SELECT * FROM cardio_complete;
--=================================================
-- Creating the final cardio cleaned table.(Friday 08/17/21)

DROP TABLE final_cardio_cleaned;
CREATE TABLE final_cardio_cleaned (
id numeric PRIMARY KEY,
Age numeric NOT NULL,
gender numeric NOT NULL,
height numeric NOT NULL,
weight numeric NOT NULL,
systolic_bp numeric NOT NULL,
diastolic_bp numeric NOT NULL,
cholesterol numeric NOT NULL,
glucose numeric NOT NULL,
smoker numeric NOT NULL,
alcohol_intake numeric NOT NULL,
active numeric NOT NULL,
cardio_disease numeric NOT NULL
);
SELECT * FROM final_cardio_cleaned;
SELECT COUNT (*) FROM final_cardio_cleaned;
----=========================================
-- Creating the BMI table
CREATE TABLE final_BMI (
id numeric PRIMARY KEY,
BMI numeric NOT NULL,
weight_status VARCHAR NOT NULL,
obesity_status VARCHAR NOT NULL
);
SELECT * FROM BMI;
SELECT COUNT (*) FROM final_BMI;
--================================================
-- Joining the two tables.

SELECT c.id,
	c.age,
    c.gender,
	c.height,
    c.weight,
	c.systolic_bp,
	c.diastolic_bp,
	c.cholesterol,
	c.glucose,
	c.smoker,
	c.alcohol_intake,
	c.active,
	c.cardio_disease,
	b.bmi,
	b.weight_status,
	b.obesity_status
INTO final_cardio_bmi_complete
FROM final_cardio_cleaned AS c
INNER JOIN final_BMI AS b
ON (c.id = b.id);
SELECT * FROM final_cardio_bmi_complete;
SELECT COUNT (*) FROM final_cardio_bmi_complete;
--====================================================--