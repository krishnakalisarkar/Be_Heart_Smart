
# Be Heart Smart

## Resources used
Data : https://www.kaggle.com/sulianova/cardiovascular-disease-dataset version 1 (Created 2019-01-19)

Software : Microsoft Excel 2018, Google Colab, Spark 3.1.2, Jupyter Notebook.

## Insight into the raw data

* The data had values separated by semicolons. 
* It was converted into a csv using Microsoft Excel. 
* Initial observations were made in Microsoft excel.
* Some continuous variables have values that out of range or are improbable.
* This may have occurred due to different reasons like human error when entering the values in dataset, omitting changing units between kilograms and pounds, possibility of values being read from a machine into the dataset, misplacement of decimal points etc.

## Data Processing and Initial Exploratory Data Analysis on Raw Data using PySpark

* Since the number of observations are 70K, PySpark was used for initial data processing, and exploratory data analysis on the raw data.  
* Decisions were taken on treating datapoints that are out of range of the expected values, for example whether it is worth retaining in the dataset or should be removed from the final working dataset.
* The first step towards data cleaning was putting the continuous variables within its probable ranges. Numbers that are improbable for adult humans, for eg. a systolic value of 16020, was removed. It is possible that the original value may have been 160.20, however as there is no way to confirm that, and because the total numbers of data points were so high, the decision was taken to remove rows with such high values.
* Continuous variables with the following values were retained:
    - Height: 135 cm to 215 cm  
    - Weight: 25 kg to 200 kg 
    - Systolic bp: 60 to 240. 
    - The negative numbers (-150, -140, -120, -115, -100) were also kept. Their sign was changed.
    - Diastolic bp: 30 to 120, and -70 (Negative sign was be changed)
* The above numbers limit were decided taking into account possible extreme measured values for the features observed in the human population. 
* Height was given a range of 4 feet 5 inches to 7 feet.
* The lowest range of weight was taken for an underweight female of height 4 feet 5 inches.
* The range of systolic and diastolic bp was decided on possible values of hypotension and hypertensive crisis values. Initial analysis of data on excel showed that high systolic bp values corresponded to cardio disease being present, and these datapoints are is required for the present analysis. These considerations led into deciding the cut-off number for systolic bp.
* The categorical variables were defined according to healthcare standards.
    - Cholesterol: normal (< 200), Moderate (200-240), High (> 240)
    - Glucose: normal (< 140), Moderate (140-200), High (> 200) units:mg/dL
* Age in the original dataset is given in days, and it was converted to years.
* No null values were observed in any of the columns.
* No duplicate observations were found.
* The cleaned data was saved as 
* The frequency of occurance of different categorical variables were found to be the following:
	- Gender : Males 45530, Females 24470
	- Cholesterol : normal 52385, moderate 9549, high 8066
	- Glucose :  normal 59479, moderate 5190, high 5331
	- Smokers : no 63831, yes 6169
	- Alcohol_intake : no 66236, yes 3764
	- Active : no 13739, yes 56261
	- Cardio_disease :  no 35021, yes 34979
* After cleaning, the number of observations were reduced to 68,571.
* The cleaned data was stored as final_cardio_cleaned.csv
* The cleaned csv file was loaded into PostgreSQL database Be_Heart_Smart and stored into a table called final_cardio_cleaned (with columns :tbl_id, age, gender, height, weight, systolic_bp, diastolic_bp, cholesterol, glucose, smoker, alcohol_intake, active, and cardio_disease)

* Categorical variables were expanded with one hot encoding.
This is to prevent any value of a categorical variable being more than another. For eg. in gender male (2) should not have a greater value than female(1).

## Machine Learning

### Logistic Regression

Logistic Regression is one of the machine learning algorithms 
model used here to predict the outcome of cardiovascular disease based upon the given features.\
Logistic Regression is an ideal algorithm for binary classification problems.\
Various steps were performed leading to and during logistic regression.\

#### EDA on the Cleaned Data
Data was loaded from PostgreSQL database Be_Heart_Smart, using sqlAlchemy to create a connection between the database and the jupyter notebook file, into a DataFrame cardio_cleaned_df. EDA was performed on the cleaned data, and the following insights were gained. (The various graphs and figures will be found in the picture folder.) 

* A density plot of age showed substantial overlap for cardio_disease positive (cardio_positive) and cardio_disease negative (cardio_negative) individuals. However the shift in peaks of the distribution indicates that for advanced age (over 55years), chances of developing cardiovascular disease increases.
* A density plot of weight showerd substantial overlap for cardio_positive cardio_negative individuals with a marginal shift of cardio_positive towards higher weight.
* Box plot of age distribution across different cholesterol levels shows increasing cholesterol levels with age. Cardio_positive individuals were older compared to cardio_negative (as also observed in the density plaot for age). The difference in age was greatest for normal cholesterol levels.
* Box plot of weight distribution across different cholesterol levels do not show much variation across different cholesterol levels. However cardio_positive individuals were heavier compared to cardio_negative accross all cholesterol levels. A large number of outliers were also seen.
* Box-plot of age accross different glucose levels also showed a slight shift towards higher age as glucose levels increased.
* Box plot of weight across different glucose levels also show a lot of outliers. Individuals with moderate and high glucose levels were heavier compared to individuals with normal glucose levels.
* Box plot of weight across activity levels did not show any difference between active and non-active individuals, however there were a lot of outliers.
* A very visible shift towards higher numbers were observed in blood pressure (for both diastolic and systolic) in cardio_positive individuals.
* BLood pressure was also shown to be increasing with age for cardio_negative individuals, whereas it remained steady at a higher number in cardio_positive individuals.

#### Feature engineering
Feature engineering was performed at different stages.\
* Height and weight information were combined into a new feature called "BMI" in order to tie up the two independent variable into one. Information from the CDC website was used to obtain the relationship to calculate BMI.
* BMI was further used to create to create two more categorical features.
	- obesity_status was created as a broad classification of BMI with value "yes" for BMI > 30, and value "no" otherwise.
	- weight_status was created as finer classification of BMI. This was done to provide options to run machine learning algorithms with different demarcation for the same information. Weight status was assigned according to the CDC.gov website, as follows: underweight (BMI<=18.5) , normal (18.5<BMI<25), overweight (25<=BMI<30), and obese (BMI>=30).
* A new feature called "pulse_pressure" was created that measured  the difference between systolic and diastolic blood pressure for each observation.

#### Table joining in the database
* A new DataFrame called BMI_df was created with the columns BMI, weight_status, obesity_status. This was extracted into final_BMI.csv, and loaded into the PostgreSQL Be_heart_Smart database as a new table called final_bmi_status.
* The tables final_cardio_cleaned and final_bmi_status were joined in SQL into a new table final_cardio_combined. 

#### Feature selection
The table final_cardio_combined was reloaded from PostgreSQL Be-Heart_Smart into a pandas DataFrame cardio_df. Numerical values were generated for weight_status and obesity_status, and other categorical variables were converted into indicator variables using get_dummies. The first column was dropped to reduce redundancy. The column names were changed and the columns rearranged into a meaningful order.\
Few more observations were eleminated on the following conditions,
	- Pulse pressure below 20 was removed to keep only positive values, and within a range observed in the human population.
	- BMI greater than 60 and lower than 15 were eliminated.
This brought the total number of observations to 67,466.\
A correlation matrix was made to help in selecting the features for logistic regression.
* Highly correlated variables, or those with redundant information were dropped. These included "weight", "obese", "is_obese", "diastolic_bp", and "pulse_pressure".
* Variables that had no or low influence on presence of cardio_disease like "id" and "weight" were dropped.
* The following 14 variables remaining were "age", "gender_M", "BMI", "underweight", "overweight", "systolic_bp", "cholesterol_moderate", "cholesterol_high", "glucose_moderate", "glucose_high", "smoker", "alcohol_intake", "active", and "cardio_disease".
* Varibles were divided into Target, which inculded "cardio_disease", and Features, which included the remaining variables.

#### Kfold cross-validation and logistic regression
A classic logistic regression model was initiated and cross validated across the dataset using KFold cross validation.\
The data was divided into a training and testing set in a 75:25 ratio.\
Data was scaled using the standard scaler.\
The model is fit on the scaled training set, and then is used to tranform the scaled training, and testing set. The predicted values are obtained, and the accuracy, confusion matrix, and classification report were created.\
- Accuracy : 72.5%
- Precision : 75%
- Recall : 67 %

(attach pictures)

#### Increase Recall for true prediction of existence of cardio_disease

The purpose of this algorithm is to predict whether cardio_disease will exist for a given set of conditions. In this situation the recall/sensitivity of predicting cardio_disease is required to be high, and false negatives need to be minimised.\
Various trails of logistic regression were performed earlier that involved selecting different combinations of features, cleaning the data with different conditions ect. The results obtained did not vary much for this model of logistic regression.\
The following code was to fine tune the threshold used in predicting the binary classifier results. The default value for threshold is 0.5. This value can be fine tuned towards obtaining maximizing recall.ROC-AUC metric was used for this purpose.

Plots were created of TPR vs FPR, Precision/Recall vs Threshold, and Precision vs Recall. (The plots are in the folder pictures).

Using the above plots, a threshold of 0.4 was set, which resulted in a recall of 80%, accuracy of 71.4%, and a precision of 68%.

(add pictures).




