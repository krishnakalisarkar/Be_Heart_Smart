# Cardio Disease Analysis

## Overview of Project 

### Purpose
The purpose of this project is to predict the risk of cardiovascular disease based on existing health and lifestyle factors.

### Resources used
- Data : https://www.kaggle.com/sulianova/cardiovascular-disease-dataset version 1 (Created 2019-01-19)

- Software : Microsoft Excel 2018, Google Colab, Spark 3.1.2

## Observations on dataset
The data had values separated by semicolons. It was converted into a csv using Microsoft Excel. Initial observations were made in Microdoft excel\
The following are the ranges of each continuous feature of the dataset, and the values for each categorical features of the original dataset
- Age range:  29 to 65 years.
- Gender : Categorical binary(1-female, 2-male)
- Height: 55 - 250 (cm)
- Weight: 10 to 200 (kg)
- ai-hi systolic: -150 to 16020
- ap_lo diastolic: -70 to 11000
- Cholesterol: Categorical (1:normal, 2:above normal, 3:well above normal)
- Glucose: Categorical (1:normal, 2:above normal, 3:well above normal)
- Smoke : Categorical binary (1-yes, 0-no)
- Alcohol intake : Categorical binary (1-yes, 0-no)
- Physical activity : Categorical binary (1-yes, 0-no)
- Cardio Y/N : Categorical binary (1-yes, 0-no)(Target)

Notice that some continuous variables have values that out of range or are improbable.\
This may have occured due to different reasons like human error when entering the values in dataset, ommitting changing units between kilograms and pounds, possibility of values being read from a machine into the dataset, misplacement of decimal points etc.

## Plan for data processing
As number of observations are 70K, PySpark will be used for initial data processing, and EDA.\
Desicions have to be made on how to treat each datapoint that is out of range of expected values, depending on whether it is worth retaining in the dataset and why, or can it be removed from the final working dataset.\
The first step towards data clean up will be putting the continuous variables within its probable ranges (including extreme values that it may take). Numbers that are improbable for adult humans, for eg. a systolic value of 16020, will be removed. It is possible that the original value may have been 160.20, however as there is no way to confirm that, and because the total numbers of datapoints were so high, the decision was taken to remove rows with such high values.

Continuous variables will retain the following values.
- Height: 135 cm to 215 cm  
- Weight: 25 kg to 200 kg 
- Systolic bp: 90 to 230. The negative numbers (-150, -140, -120, -115, -100) were also kept. Their sign would be changed.
- Diastolic bp: 40 to 180, and -70 (Negative sign will be changed)

The above numbers limit were decided taking into account possible extreme measured values for the features.\
Height was given a range of 4 feet 5 inches to 7 feet.\
The lowest range of weight was taken for an underweight female of height 4 feet 5 inches.\
The range of systolic and diastolic bp was decided on possible values of hypotension and hypertensive crisis values.\

The categorical variables will first be defined according to healthcare standards.
- Cholesterol: normal (< 200), Moderate (200-240), High (> 240)
- Glucose: normal (< 140), Moderate (140-200), High (> 200) units:mg/dL

Categorical variables will be expanded with one hot encoding.\
This is to prevent any value of a categorical variable being more than another. For eg. in gender male (2) should not have a greater value than female(1).
