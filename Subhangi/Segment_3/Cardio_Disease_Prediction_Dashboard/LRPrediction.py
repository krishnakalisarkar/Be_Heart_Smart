# Logistic Regression on the cleaned and merged cardio data.

# Import dependencies
import pandas as pd
import numpy as np
from numpy import argmax

# Import sqlalchemy dependencies
import sqlalchemy
from sqlalchemy import create_engine

#from config_RDS import db_password
from config import db_password

# Import model dependencies
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn import metrics

# Create a connection with the database in postgres
db_string = f"postgresql://postgres:{db_password}@127.0.0.1:5433/Be_Heart_Smart"
engine = create_engine(db_string)

# Read the data from the database table
cardio_df = pd.read_sql_table("final_cardio_combined", engine)

# Pre-process the data before applying supervised machine learning

# Create a column called "pulse_pressure" which gives the difference between systolic_bp and diastolic_bp
cardio_df["pulse_pressure"] = cardio_df["systolic_bp"] - cardio_df["diastolic_bp"]

# Generate numerical values for weight_status, and obesity_status, and convert other categorical variables into
# indicator variables using get_dummies. The first column is dropped, to reduce redundancy.
cardio_encoded_df = pd.get_dummies(cardio_df, columns=["weight_status", "obesity_status", "gender", "cholesterol", "glucose"], 
                                  prefix=["weight", "obesity", "gender", "cholesterol", "glucose"], drop_first=True)

# Rearrange the columns into a more meaningful order.
rearranged_columns = ["tbl_id", "age", "gender_2.0", "height", "weight", "bmi", "weight_underweight", "weight_overweight", 
                      "weight_obese", "obesity_yes", "systolic_bp", "diastolic_bp", "pulse_pressure", 
                      "cholesterol_2.0", "cholesterol_3.0", "glucose_2.0", "glucose_3.0", 
                      "smoker", "alcohol_intake", "active", "cardio_disease"]

cardio_encoded_df = cardio_encoded_df[rearranged_columns]

# Rename the columns to make the features more meaningful.
cardio_encoded_df = cardio_encoded_df.rename(columns={"gender_2.0": "gender_M", "bmi": "BMI", "weight_underweight": "underweight", 
                                  "weight_overweight":"overweight", "weight_obese": "obese", "obesity_yes": "is_obese",
                                 "cholesterol_2.0": "cholesterol_moderate", "cholesterol_3.0": "cholesterol_high",
                                 "glucose_2.0": "glucose_moderate", "glucose_3.0": "glucose_high"})

# Keep the observations that have BMI < 60, and less BMI > 15, and pulse pressure > 20
df = cardio_encoded_df[(cardio_encoded_df["BMI"] < 60) & (cardio_encoded_df["BMI"] >15) & 
                       (cardio_encoded_df["pulse_pressure"] > 20)]

# Data Preparation for Initial Modelling

# Drop the id column
df = df.drop(columns="tbl_id", axis=1)

# Trim the DataFrame to keep only features that are of importance to the ML algorithm

df_trimmed = df[["age", "underweight", "is_obese", "systolic_bp", "pulse_pressure", "cholesterol_high", "active", "cardio_disease"]]

# Set the Target and Features of the model
y = df_trimmed["cardio_disease"]
X = df_trimmed.drop(columns="cardio_disease")

# Scale the data using the standard scalar. It will be fit on the training set, 
# and will be used to transform the training set, as well as the user input data.

# Create an instance of the StandardScaler.
scaler = StandardScaler()
# Fit and transfor on the training set
X_scaler = scaler.fit(X)
X_scaled = X_scaler.transform(X)

# Building the Logistic Regression model
# Model evaluation criterion:
# Predicting an individial has cardiovascular disease when he/she does not - A False positive. Loss of peace of mind!
# Predicting an individual does not have cardiovascular disease when he/she does - A False negative. Putting the individual at risk.
# Recall or sensitivity is maximized, greater the Recall lesser the chances of false negatives.

# Create an instance of the logistic Regression model
classifier = LogisticRegression(solver='lbfgs', max_iter=200, random_state=1)
# Fit the model on the scaled data
classifier.fit(X_scaled, y)

## Assigning health numbers for computing probability of getting CVD
# age = 41
# underweight = 0
# is_obese = 0.0
# systolic_bp = 120.0
# pulse_pressure = 40.0
# cholesterol_high = 0
# active = 1

def predict():

    # Obtaining the health numbers from the user.
    u_age = float(input("Enter age (in years): "))
    u_height = float(input("Enter height (in cm) : "))
    u_weight = float(input("Enter weight (in lbs): "))
    u_sys = float(input("Enter systolic (top) blood pressure : "))
    u_dias = float(input("Enter diastolic (bottom) blood pressure : "))
    u_cholesterol = input("Do you have high cholesterol i.e. greater than 240 mg/dL (Y/N) ?: ")
    u_active = input("Do you lead an active lifestyle (Y/N?")

    # Define function for calculating BMI, and assigning values to underweight, and is_obese
    def bmi_calc(u_weight,u_height):
        height_in_m = u_height/100.0
        weight_in_kg = u_weight * 0.454
        bmi = round((weight_in_kg/height_in_m**2),1)
        if bmi <= 18.5:
            underweight = 1
            is_obese = 0
        elif bmi >= 30:
            underweight = 0
            is_obese = 1
        else:
            underweight = 0
            is_obese = 0

        return underweight, is_obese   

    # Defining the variables required for the program
    age = u_age
    underweight , is_obese = bmi_calc(u_weight, u_height)
    systolic_bp = u_sys
    pulse_pressure = u_sys - u_dias
    cholesterol_high = 1 if u_cholesterol == 'Y' or u_cholesterol == 'y' else 0
    active = 1 if u_active == 'Y' or u_active == 'y' else 0

    # Change the user input data into a DataFrame
    X_test_df= pd.DataFrame([[age, underweight, is_obese, systolic_bp, pulse_pressure, 
                            cholesterol_high, active]], columns=["age", "underweight", "is_obese", "systolic_bp", 
                                                                  "pulse_pressure", "cholesterol_high", "active"])

    # Change the DataTypes of the user input data into floats
    X_test_df[["age", "underweight", "is_obese", "systolic_bp", 
                "pulse_pressure", "cholesterol_high", "active"]] = X_test_df[["age", "underweight", "is_obese", "systolic_bp", 
                                                                            "pulse_pressure", "cholesterol_high", 
                                                                            "active"]].apply(pd.to_numeric, downcast="float")


    # Scale the user input test
    X_test_scaled = X_scaler.transform(X_test_df)

    # Use the Logistic Regression model, with threshold set to 0.4, on the user input set.
    threshold = 0.4

    # Obtain the probability of having cardiovascular disease using the model
    preds_test = classifier.predict_proba(X_test_scaled)

    # If probability is greater than the threshold, then cardiovascular disease exists, 
    # or else the user is negative for cardiovascular disease 
    if (preds_test[:,1] > threshold) :
        prediction = "Positive for cardiovascular disease!"
    else :
        prediction = "Negative for cardivascular disease!"
    
    # Give output of the prediction
    return prediction


if __name__ == "__main__":
    
    # If running as script, print scraped data
    print(predict())


