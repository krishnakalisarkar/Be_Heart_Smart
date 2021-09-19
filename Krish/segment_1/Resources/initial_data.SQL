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