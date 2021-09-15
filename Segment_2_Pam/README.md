# Final_project_group7

## Database
A PostgresRDS server was created using Amazon webservices. Team members can connect to the PostgresRDS server to reach the "Be_Heart_Smart" database using PGAdmin. 
PostgresRDS server endpoint: be-heart-smart.cy6j2bmyzt6p.us-east-2.rds.amazonaws.com
Port: 5432

3 tables were created to store the data:
The source data contained 70,000 entries, post clean up the final data set count is 68,297
- cardio_cleaned table contains the cleaned-up data from the original source file
- BMI table contains caluclated Body mass index data. The source attributes were used to calulate a BMI for each ID in the clean data set
- cardio_cleaned_with_BMI is a table contining data from the cardio_cleaned and BMI tables. A sql script was written to join the data on the id field.







