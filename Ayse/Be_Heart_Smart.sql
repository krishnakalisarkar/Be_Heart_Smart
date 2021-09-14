CREATE TABLE cardio_info (
  id numeric,
  age numeric,
  gender numeric,
  height numeric,
  weight numeric,
  ap_hi numeric,
  ap_lo numeric,
  cholesterol numeric,
  gluc numeric,
  smoke numeric,
  alco numeric,
  active numeric,
  cardio numeric
);

CREATE TABLE cardio_info_initial_clean (
  id numeric,
  age numeric,
  gender numeric,
  height numeric,
  weight numeric,
  ap_hi numeric,
  ap_lo numeric,
  cholesterol numeric,
  gluc numeric,
  smoke numeric,
  alco numeric,
  active numeric,
  cardio numeric
);
 
 Select * From cardio_info_initial_clean;

 CREATE TABLE cardio_data_cleaned (
  age numeric,
  gender numeric,
  height numeric,
  weight numeric,
  systolic_bp numeric,
  diastolic_bp numeric,
  cholesterol numeric,
  glucose numeric,
  smoker numeric,
  alcohol_intake numeric,
  active numeric,
  cardio numeric
);
 
 Select * From cardio_data_cleaned;