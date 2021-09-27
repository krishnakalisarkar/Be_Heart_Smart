# Be Heart Smart ❤

![image](https://mreib.weebly.com/uploads/5/8/8/0/58809365/heart-health-weeks-banner-jpg-pagespeed-ce-21mh32ls99_orig.jpg)

## Hearty Healthcare Enthusiasts (Collaborators):
* Ayse Ozgun
* Pam Noble
* Subhangi Ghosh
* Krishnakali Sarkar

[❤ CLICK ME TO GO TO THE PRESENTATION SLIDES](https://github.com/krishnakalisarkar/Be_Heart_Smart/blob/main/Presentation/Be_Heart_Smart_Presentation_Segment_2.pdf).


## Topic
Cardiovascular Disease: The purpose of this project is to predict the risk of cardiovascular disease based on existing health and lifestyle factors.

### Purpose for selecting a heart healthy topic:

Cardiovascular diseases (CVDs) are the leading cause of death globally, taking an estimated 17.9 million lives each year. CVDs are a group of disorders of the heart and blood vessels and include coronary heart disease, cerebrovascular disease, rheumatic heart disease and other conditions. More than four out of five CVD deaths are due to heart attacks and strokes, and one third of these deaths occur prematurely in people under 70 years of age. The most important behavioral risk factors of heart disease and stroke are :
* unhealthy diet, 
* physical inactivity, 
* tobacco use and 
* harmful use of alcohol. 

The effects of behavioral risk factors may show up in individuals as 

* raised blood pressure, 
* raised blood glucose, 
* raised blood lipids, 
* overweight and 
* obesity. 

A healthy heart is central to overall good health. The purpose of this project is to spread awareness among individuals and that embracing a healthy lifestyle at any age can prevent heart disease and lower the  risks for  heart attack or stroke.


## Resources used
- Data : https://www.kaggle.com/sulianova/cardiovascular-disease-dataset version 1 (Created 2019-01-19)

- Software : Microsoft Excel 2018, Google Colab, Spark 3.1.2, Jupyter Notebook

## The Dataset Description:

There are 3 types of input features:

* Objective: factual information;
* Examination: results of medical examination;
* Subjective: information given by the patient.

### Features:

| Objective.    | Examination.  | Subjective |
| ------------- |:-------------:|:-----------|
| Age  (years)  | Systolic Blood Pressure     | Smoking
| Height (cms)  | Diastolic Blood Pressure    | Alcohol Intake
| Weight.(Kg)   | Cholesterol    | Physical activity
| Gender ()     | Glucose

### Target: 
**Presence or absence of cardiovascular disease (Cardio).**

The following are the ranges of each continuous feature of the dataset, and the values for each categorical features of the original dataset
- Age range:  29 to 65 years.
- Gender : Categorical binary(1-female, 2-male)
- Height: 55 - 250 (cm)
- Weight: 10 to 200 (kg)
- ai-hi systolic: -150 to 16020
- ap_lo diastolic: -70 to 11000
- Cholesterol: Categorical (1:normal, 2:above normal, 3:well above normal)
- Glucose: Categorical (1:normal, 2:above normal, 3:well above normal)
- Smoker : Categorical binary (1-yes, 0-no)
- Alcohol intake : Categorical binary (1-yes, 0-no)
- Physical activity : Categorical binary (1-yes, 0-no)
- Cardio Y/N : Categorical binary (1-yes, 0-no)

### Insight into the raw data

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

## Initial Exploratory Data Analysis using Python:

### Data Cleaning:

#### Checking for outliers:
* To check for outliers in the features like systole, diastole, height and weight, four box plots were created and from the box plots the outliers are calculated.

#### Removing the outlier rows:
* Based on the outlier values, the entire dataset is cleaned and the rows with outlier data is dropped in features like systole, diastole, height and weight.
* The dataset is reduced from 70,000 rows to 60,532 rows.

### EDA bar graphs in matplotlib:

#### Effect of high cholesterol on developing Cardiac disease:
* A groupby on cardio and cholesterol and performing a mean shows that cholesterol levels more than 240 had a higher chance of developing heart disease.
* Normal cholesterol level has a lesser chance of developing heart disease.

#### Effect of high glucose on developing Cardiac disease:
* A groupby on cardio and glucose and performing a mean shows that high glucose levels had a higher chance of developing heart disease.
* Normal glucose level has a lesser chance of developing heart disease.

#### Effect of gender on developing Cardiac disease:
* From this dataset, both male and female are at equal risk of developing heart disease.

#### Effect of alcohol consumption on developing Cardiac disease:
* From this dataset, it is evident that alcohol consumption alone with no other underlying condition has no effect on developing heart disease.
* It is yet to be explored if alcohol consumption along with other underlying medical condition has an effect on developing heart disease.

### Data Analysis:

#### Effects of cholesterol on developing heart diseases as seen based on gender.
* A code is written that does the groupby function on cardio and cholesterol and the mean is taken to see the number of men and female who develop cardio disease based on their cholesterol levels.
* The cholesterol levels are categorized as normal = 1, moderate = 2 and high =3.
* A grouped bar plot is created using Matplotlib.

#### Results:
The interesting facts that showed up in the bar plot are as follows:
* Having normal cholesterol levels, females have a slightly higher risk of developing heart diseases than males.
* Even with moderate cholesterol levels, females have a slightly higher risk of developing heart diseases than males.
* Interestingly, with high cholesterol levels, males have a higher risk of developing heart disease than males.
* The association between testosterone and cholesterol levels is long known. As men age, their bodies make less testosterone, hence older men are more likely to have heart problems and high cholesterol.

#### Effects of glucose on developing heart diseases as seen based on gender.
* A code is written that does the groupby function on cardio and glucose and the mean is taken to see the number of men and female who develop cardio disease based on their glucose levels.
* The glucose levels are categorized as normal = 1, moderate = 2 and high =3.
* A grouped bar plot is created using Matplotlib.

#### Results:
The facts that showed up in the bar plot are as follows:
* With normal, moderate and high glucose levels, both males and females are at equal risk of developing heart diseases.

## Database: 

* An initial PostgreSQL database is created namely "Be_Heart_Smart" and the raw data is inserted in that database.
* A SQL query is generated to create the table:

CREATE TABLE cardio_info (\
  id numeric,\
  age numeric,\
  gender numeric,\
  height numeric,\
  weight numeric,\
  ap_hi numeric,\
  ap_lo numeric,\
  cholesterol numeric,\
  gluc numeric,\
  alco numeric,\
  active numeric,\
  cardio numeric\
);


A cardio cleaned table is created in PostgreSQL database by using the following schema:

CREATE TABLE final_cardio_cleaned (\
	id numeric PRIMARY KEY,\
	Age numeric NOT NULL,\
	gender numeric NOT NULL,\
	height numeric NOT NULL,\
	weight numeric NOT NULL,\
	systolic_bp numeric NOT NULL,\
	diastolic_bp numeric NOT NULL,\
	cholesterol numeric NOT NULL,\
	glucose numeric NOT NULL,\
	smoker numeric NOT NULL,\
	alcohol_intake numeric NOT NULL,\
	active numeric NOT NULL,\
	cardio_disease numeric NOT NULL\
);

Once the table is created, the data is imported from the csv file.

Another table BMI is also created including the BMI that was calculated from the height and weight of the patients. The following schema is used to make the table.

CREATE TABLE final_BMI (\
	id numeric PRIMARY KEY NOT NULL,\
	BMI numeric NOT NULL,\
	weight_status VARCHAR NOT NULL,\
	obesity_status VARCHAR NOT NULL\
);
Once the table is created, the data is imported from the respective csv files.

This was followed by joining the two tables on their ID which is their primary key, to create a cardio complete table. This was done using the following code:

SELECT c.id,\
	c.age,\
    	c.gender,\
	c.height,\
    	c.weight,\
	c.systolic_bp,\
	c.diastolic_bp,\
	c.cholesterol,\
	c.glucose,\
	c.smoker,\
	c.alcohol_intake,\
	c.active,\
	c.cardio_disease,\
	b.bmi,\
	b.weight_status,\
	b.obesity_status\
INTO final_cardio_bmi_complete\
FROM final_cardio_cleaned AS c\
INNER JOIN final_BMI AS b\
ON (c.id = b.id);\

Once the cardio complete table is created, it is then connected to Jupyter notebook using SQL alchemy.

* An AWS server connection was created in PostgreSQL and a database set up. The preliminary joined data table was made here, from where a connection was established with the jupyter notebooks for future analysis.\
The final tables however were joined in the database in local PostgreSQL server, and accessed with SQLAlchemy for machine learning.


## Machine Learning

### Questions expected to be answered with our Machine Learning model

* Is a person at risk of cardiovascular disease?
* What are the potential risk factors for cardiovascular disease--smoking, alcohol consumption, obesity, etc?
* Which factors are the best predictors of cardiovascular disease?

### Machine learning models that was used in our analysis:

* Our dataset is large with over 60 thousand observations and 11 features. 
* Our aim is to help predict presence of cardiovascular disease  timely and accurately.
* We try different machine learning algorithms to compare and determine the model that will best predict the presence of cardiovascular disease.
* Our machine learning models were classification models since we have a target variable that describes if the person has a heart disease or not. Hence, the two possible outcomes are: "Yes" or "No". Therefore, we employ supervised machine learning algorithms for our analysis.
* The machine learning algorithms we used are : 
1) Logistic Regression,
2) Random Forests,
3) Deep Neural Networks 


### Reasons:

* These are suitable for interpreting large, complex data and non-linear relationships.
* They also allows optimizing the model and produce high accuracy results.


### EDA on the Cleaned Data

Data was loaded from PostgreSQL database Be_Heart_Smart, using sqlAlchemy to create a connection between the database and the jupyter notebook file, into a DataFrame cardio_cleaned_df. EDA was performed on the cleaned data, and the following insights were gained. (The various graphs and figures will be found in the folder Pictures/Segment_2/Images_Subhangi.) 

* A density plot of age showed substantial overlap for cardio_disease positive (cardio_positive) and cardio_disease negative (cardio_negative) individuals. However the shift in peaks of the distribution indicates that for advanced age (over 55years), chances of developing cardiovascular disease increases.
* A density plot of weight showerd substantial overlap for cardio_positive cardio_negative individuals with a marginal shift of cardio_positive towards higher weight.
* Box plot of age distribution across different cholesterol levels shows increasing cholesterol levels with age. Cardio_positive individuals were older compared to cardio_negative (as also observed in the density plot for age). The difference in age was greatest for normal cholesterol levels.
* Box plot of weight distribution across different cholesterol levels do not show much variation across different cholesterol levels. However cardio_positive individuals were heavier compared to cardio_negative accross all cholesterol levels. A large number of outliers were also seen.
* Box-plot of age accross different glucose levels also showed a slight shift towards higher age as glucose levels increased.
* Box plot of weight across different glucose levels also show a lot of outliers. Individuals with moderate and high glucose levels were heavier compared to individuals with normal glucose levels.
* Box plot of weight across activity levels did not show any difference between active and non-active individuals, however there were a lot of outliers.
* A very visible shift towards higher numbers were observed in blood pressure (for both diastolic and systolic) in cardio_positive individuals.
* Blood pressure was also shown to be increasing with age for cardio_negative individuals, whereas it remained steady at a higher number in cardio_positive individuals.

### Feature Engineering

Feature engineering was performed at different stages.
* Height and weight information were combined into a new feature called "BMI" in order to tie up the two independent variable into one. Information from the CDC website was used to obtain the relationship to calculate BMI.
* BMI was further used to create to create two more categorical features.
	- obesity_status was created as a broad classification of BMI with value "yes" for BMI > 30, and value "no" otherwise.
	- weight_status was created as finer classification of BMI. This was done to provide options to run machine learning algorithms with different demarcation for the same information. Weight status was assigned according to the CDC.gov website, as follows: underweight (BMI<=18.5) , normal (18.5<BMI<25), overweight (25<=BMI<30), and obese (BMI>=30).
* A new feature called "pulse_pressure" was created that measured  the difference between systolic and diastolic blood pressure for each observation.

### Table Joining in the Database

* A new DataFrame called BMI_df was created with the columns BMI, weight_status, obesity_status. This was extracted into final_BMI.csv, and loaded into the PostgreSQL Be_heart_Smart database as a new table called final_bmi_status.
* The tables final_cardio_cleaned and final_bmi_status were joined in SQL into a new table final_cardio_combined.
* A generalized schema of the tables is shown in the database section here. The specific code for joining and pictures will be found in the folder Pictures/Segment_2/Images_Subhangi.)

### Data Processing

The table final_cardio_combined was reloaded from PostgreSQL Be-Heart_Smart into a pandas DataFrame cardio_df. Numerical values were generated for weight_status and obesity_status, and other categorical variables were converted into indicator variables using get_dummies. The first column was dropped to reduce redundancy. The column names were changed and the columns rearranged into a meaningful order.\
Few more observations were eleminated on the following conditions,
	- Pulse pressure below 20 was removed to keep only positive values, and within a range observed in the human population.
	- BMI greater than 60 and lower than 15 were eliminated.
This brought the total number of observations to 67,466.\
A correlation matrix showed the relationship between the variables. We notice correlation between the following,
	- height, and weight
	- weight and BMI (strong)
	- weight and obese (and is_obese)
	- BMI and obese (strong)
	- overweight and obese
	- systolic_bp and pulse pressure (strong)
	- systolic_bp and diastolic_bp (strong)
	- cholesterol_high and glucose_high
	- smoker and alcohol_intake (small)


### Logistic Regression

Logistic Regression is one of the machine learning algorithms 
model used here to predict the outcome of cardiovascular disease based upon the given features.\
Logistic Regression is an ideal algorithm for binary classification problems.\
Various steps were performed leading to, and during logistic regression.

#### Data Preparation for Initial Modeling

* "tbl_id" was dropped.
* Variables were divided into Target, which included "cardio_disease", and Features, which included the remaining variables.
* The data points were then split into three sets as Train, Validate, and Test in the ratio 60:20:20.
* Data was scaled using the standard scaler.The model was fit on the scaled training set, and then was used to tranform the scaled training, and testing set.


#### Stratified Kfold cross-validation 

Before we proceed, we need to address what is the performace metric we need to consider here.\
Predicting an individial has cardiovascular disease when he/she does not is a false positive. This will result in loss of peace of mind for the individual, and perhaps more medical tests to reach the correct conclusions.\
However,  incorrectly predicting an individual to be cardiac healthy has a much greater consequence. A False negative puts the individual at risk.\
Therefore, in this case recall or sensitivity to be maximized, because greater the recall the lesser are the chances of false negative predictions.

A Linear Regression model was initiated, and crossvalidated on the training set using stratified KFold cross-validation, with a k=10 number of folds.\
The model was evaluated by scoring recall. The recall scores of all 10 folds were very similar around 66%, indicating that the model did not overfit.

#### Feature selection

Sequential Feature Selector was used applying the Sequential Forward Selection (SFS) algorithm.

SFS was initially scored on recall, and tho features - "underweight", and "alcohol_intake" were marked to give the best performance.\
On training logistic regression with these two features on the scaled train set, and testing on the scaled validation set, a recall of 94% is achieved.\
However the accuracy drops to 50%, like a random chance of the model being able to correctly predict the outcome of whether a patient is positive or negative for heart disease.\
The incorrect prediction of the model in this case would be biased towards false positives, but because the model will correctly predict only half the time, this model was not considered any further.

SFS was executed again but this time performance was scored on the harmonic mean. The following six features were chosen as important.\
age, underweight, is_obese, systolic_bp, pulse_pressure, cholesterol_high, active.

The scaled train, validation, and test sets were trimmed down to include only the above seven features. A correlation matrix showed the a high correlation between the systolic+bp and pulse pressure, as expected. However both features were kept for the machine learning. 

The model was fit on the scaled train set, and tested on the validation set. Recall of 67%, f1 score of 71%, with an accuracy of 72.6% was achieved. 

(attach pictures of the classification report)

#### Increase Recall for true prediction of existence of cardio_disease by hypertuning the threshold

Hypertuning of the model was the next step to improve the recall without losing the accuracy.

A Reciever Operating Characteristic (ROC) curve was plotted, and it showed an AUC score of 78%.\
The AUC_ROC strategy calculated the threshold to be around 0.47.

Recall/Precision vs Threshold graph showed that recall drops quickly as threshold increases. Precision increases as threshold increases but the change is not as daramatic as the recall curve.\
The precision vs recall curve gave a clearer picture of thier relationship. Based on this, a threshold of 0.4 was chosen to optimize recall without greatly compromising accuracy or the harmonic mean.\
(The plots are in the folder the folder Pictures/Segment_2/Images_Subhangi.)

The logistic regression model was re-run on the validation set, which gave a recall of 80.9% with an accuracy of 70.6%

The model in its final form was then executed on the scaled test set. This set of data was not "seen" by the model in earlier steps to reduce data leakage. Logistic regression on the test set gave a recall of 81%, precision of 67.2%, and an accuracy of 70.8%.

(add pictures of the final model report)

#### Takeaway from Logistic Regression

The takeaway from the above exercise was that the nature of the dataset was such that the best overall accuracy was around 70%, and the precision and the recall are tied up such that if recall were to be maximised by manipulating the data, accuracy, and precision would quickly fall.\
A better way to improve the recall without losing out on the accuracy or the harmonic mean was to instead hypertune the model by lowering the threshold from it's default of 0.5 to 0.4 to positively predict cardiac disease.


### Random Forest Classification Model

#### Data Preparation for Initial Modeling

* tbl_id column was dropped as it is redundant for the purpose of our analysis.
* We investigate the correlation between the variables using correlation table. 
* When we look at the correlation table we notice that obese and is_obese variables are highly correlated (almost 0.90). This is expected as these two variables describe the same thing and calculated using the same variables.
* weight and bmi are also highly correlated (0.87 ) since bmi is calculated using the weight variable.
* Hence, keeping all these variable that are dependent on each other is redundant and will adversely affect our model's interpretability.
* Since BMI has all the information that weight and height variables have we drop these columns.
* Similarly, we drop the is_obese column since obese column already carries the same informaion.
* Variables were divided into Target, which included "cardio_disease", and Features, which included the remaining variables.
* The data points were then split into three sets as Training, Validation, and Testing in the ratio 70:20:10.
* Data was scaled using the standard scaler.The model was fit on the scaled training set, and then was used to tranform the scaled training, and testing set.

#### K-fold cross-validation

* We used K-fold cross-validation. K-fold cross validation is less prone to selection bias. This is because training and testing is performed in different parts k different times. 
* k=10 is shown to result in relatively more robust model with low bias. Thus, we pick our k to be equal to 10.
* Therefore, our data was split into 10 folds and at each model different combination of 9 folds are used for training and the remaining 1 fold is used for testing. 
* The roc_auc and accuracy scores were very similar across the 10 folds indicating that the model was not overfit.
* The roc_auc of the 10 folds are as follows:

![Roc_auc_initial](Pictures_4/Segment_4/roc_auc_initial.png)

* The mean roc_auc score of the 10 folds is: 

![Roc_auc_initial_mean](Pictures_4/Segment_4/mean_roc_auc_initial.png)

#### Feature Selection with feature_importances

* To check for important features we split that data into train and test sets using sklearn's train_test_split. We set 20% of our trainvalid set (this consists of the training and validation set of the model) as a test set and 80% of it as a training set.
* We standardize the data with StandardScaler and use the scaled data to get the feature_importances.

![Feature Importances](Pictures_4/Segment_4/new_feature_importances.png)


* From feature importances we can see that BMI is the most important feature affecting the performance of our Random Forest model. The top 4 most relevant features in predicting the outcome of cardiovascular disease are bmi, age, systolic_bp and pulse_pressure respectively.
* We create a model using only these variables and investigate if the performance of our model increases. 
*  SelectFromModel chooses the features that have greater importance than the mean importance of all the features. Gini impurity is used to determine the importance of a feature.
* However, the performance of the selected model with only the selected features did not improve. In fact, all the values for recall, roc-auc and f1 scores decreased. So, we choose to keep all the features for now.
* We retrain our model on the scaled dataset and predict it on the validation set to obtain the accuracy score, confusion matrix and the classification report. We also get the roc_auc score.
* The accuracy and roc_auc scores, the confusion matrix and classification report for our model are shown below:

![Roc_auc_score on the validation set](Pictures_4/Segment_4/roc_auc_valid.png)
![Confusion Matrix on the validation set](Pictures_4/Segment_4/cm_valid.png)
![Classification Report on the validation set](Pictures_4/Segment_4/cr_valid.png)



* Even though the mean roc_auc score of our RF model on the validation set is 0.75, the accuracy score is much lower, 0.69. We perform hypertuning to find the best model.
* We search for the best parameters using scikit_learn's GridSearchCV function. We use 5-fold cross-validation for this stage because it was computationally very time consuming with the 10-fold. Also, we had to limit the parameters we wanted to pass in our GridSearchCV function because it became computationally impossible to complete the process with our resources.
* The best parameters with the grid search are displayed below:

![Grid Search Best Parameters](Pictures_4/Segment_4/best_params_df.png)


* Based on the results of the grid search we plug in the best parameters and recreate our random classifier model.
* We retrain our model with the new hyperparameters.
* We predict the new model on our test set and our accuracy score, confusion matrix and classification report are displayed below.

![Confusion Matrix on the validation set](Pictures_4/Segment_4/cm_tuned.png)
![Classification Report on the validation set](Pictures_4/Segment_4/cr_tuned.png)

* We obtain our roc_auc scores and the mean score for the new model.

![Final Roc_auc_score of the 10 fold](Pictures_4/Segment_4/roc_auc_tuned.png)

![Final Mean Roc_auc_score ](Pictures_4/Segment_4/mean_roc_auc_tuned.png)

#### Takeaway from Random Forest Classification Model

* With hyperparameter tuning we were able to increase the accuracy, roc-auc score, precision and F1 scores. The accuracy score increased to 0.73 from 0.69, the mean roc_auc score increased to almost 0.80 from 0.75 and the F1 score increased from 0.69 to 0.71. 
* However, from the confusion matrix we can see that even though false positives decreased significantly (from 2033 to 669) true positives also decreasedby half. 
* As a result, from the classification report we can see that our recall for the people with cardiovascular disease decreased (from 0.69 to 0.66) even though precision increased significantly (0.69 to 0.77).
* Low recall score is not ideal for our model as this means that there is 44% of the time we will not be able to correctly diagnose people with cardiovascular disease that actually have cardiovascular disease. 
* However, with higher precision, our model reduces the probability of patients being wrongly diagnosed with the disease--and potentially prevent wrong treatment. 
* Even though, this model is not ideal, it is an improved version of the initial model with higher F1, accuracy and and roc_auc scores.In oreder to increase the performance of our model more feature engineering and selection and further hypertuning could be done to increase recall without reducing precision.¶

#### Advantages of Random Forest 

* One of the most accurate machine learning algorithms
* They provide good predictive performance 
* They are generally less prone to over-fitting as a result of averaging or combining the results of different decision trees.
* It can handle many predictor variables
* Maintains accuracy even when a large proportion of the data is missing
* They are easily intepretable
* They provide the important features
* Scaling is not needed to achieve good accuracy

#### Limitations of Random Forest

* It can overfit datasets that have a lot of noise
* For data including categorical predictor variables with different number of levels, random forests are biased in favor of those predictors with more levels. Therefore, the variable importance scores from random forest are not always reliable for this type of data
* Large number of trees may slow down the algorithm
* Data containing groups of correlated features of similar relevance for the output.


Resources used: 
https://medium.com/@aravanshad/gradient-boosting-versus-random-forest-cfa3fa8f0d80
https://medium.com/analytics-vidhya/random-forest-classifier-and-its-hyperparameters-8467bec755f6

### Deep Neural Network Model

Neural Network on the cardio complete dataset.
* The jupyter notebook is connected to PostgresSQL using SQL alchemy.
* Once the dataset is downloaded from the database, some pre processing of the dataset is done prior to executing neural network model.
* The continuous variables like obesity status and weight status are converted from string to numeric.
* This was confirmed by sampling the data using the .sample function.
* In the pre processing step, the non-beneficial column like id that didnot have an effect on the cardiac disease was dropped from the dataframe. With further analysis the height column was also dropped.
* The entire data is split using the train_test_split function into features and target arrays.
* The target is the cardio_disease column.
* The feature columns are standardized using the StandardScaler instances.
* The deep neural model initially is defined with 4 hidden nodes and number of neurons per layer is as below:\
hidden_nodes_layer1 =  500\
hidden_nodes_layer2 = 300\
hidden_nodes_layer3 = 100\
hidden_nodes_layer4 = 50
* The loss function is binary_crossentropy, using the adam optimizer.\
nn.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])
* The accuracy of this model was 71%
* Various other trials were made where the hidden layers were increased to 5 and the number of neurons in each layers were increased.
* In a few instances the input was changed from Relu to Sigmoid and the output was changed from Sigmoid to softmax.

#### Best results from the Neural Network Model:
* The neural network model that gave an accuracy of 73%  had the following features:
* 5 hidden hayers and the distribution of neurons are as follows:\
hidden_nodes_layer1 = 700\
hidden_nodes_layer2 = 500\
hidden_nodes_layer3 = 200\
hidden_nodes_layer4 = 100\
hidden_nodes_layer5 = 50
* The activation function is Relu and output function is Sigmoid.
* The optimizer is changed to rmsprop\
nn.compile(loss="binary_crossentropy", optimizer ="rmsprop", metrics=["accuracy"])
* Ann visualizer provides a good picture of the neural network model.

## Dashboard

[❤ CLICK ME]( https://krishnakalisarkar.github.io/Be_Heart_Smart/)

* The dashboard called "Be Heart Smart", it is done with javascript.
* The dashboard is made interactive.
* If the patient’s ID is selected , the demographic informations of that patient shows in the demographic info column.
* The gauge indicator shows if that patient has heart disease or not.0 shows does not have any cardiac disease and 1 shows the person has cardiac disease.
* The horizontal bar graph shows the primary factors that are responsible for developing a heart disease.
* The bubble chart shows the different behavioral factors that might contribute towards developing a heart disease.

* In addition to the javascript dashboard an interactive Tableau Dashboard was created.

[❤ CLICK ME TO GO TO THE TABLEAU DASHBOARD](https://public.tableau.com/app/profile/ayse1055/viz/BeHeartSmart/BeHeartSmartStory?publish=yes).

