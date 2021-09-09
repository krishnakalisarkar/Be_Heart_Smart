
# Be Heart Smart ❤

![image](https://mreib.weebly.com/uploads/5/8/8/0/58809365/heart-health-weeks-banner-jpg-pagespeed-ce-21mh32ls99_orig.jpg)

## Hearty Healthcare Enthusiasts (Collaborators):
* Ayse Ozgun
* Pam Noble
* Subhangi Ghosh
* Krishnakali Sarkar

### Communication Channels:

* Slack: Instant messaging with team members, scheduling time to put brilliant minds together to work.

* Zoom: Brainstorming sessions, finalizing mission into action.

* Email: Another platform to collaborate with team members to share data.
    
## Git Hub
### Main Branch : Be Heart Smart ❤
The main git hub repository namely " Be Heart Smart" is created.

### Individual Branch:
Each collaborator created their individual branch to commit their files.

### Content
Topic: Cardiovascular Disease 

Website: https://www.kaggle.com/sulianova/cardiovascular-disease-dataset

#### The Dataset Description:

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
**Presence or absence of cardiovascular disease.**

## Purpose for selecting a heart healthy topic:

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

A healthy heart is central to overall good health. The purpose of this project is to spread awareness among individuals that embracing a healthy lifestyle at any age can prevent heart disease and lower the  risks for  heart attack or stroke.


# Initial Exploratory Data Analysis:

## Data Cleaning:

### Checking for outliers:
* To check for outliers in the features like systole, diastole, height and weight, four box plots were created and from the box plots the outliers are calculated.

### Removing the outlier rows:
* Based on the outlier values, the entire dataset is cleaned and the rows with outlier data is dropped in features like systole, diastole, height and weight.
* The dataset is reduced from 70,000 rows to 60,532 rows.

## EDA bar graphs in matplotlib:
### Effect of high cholesterol on developing Cardiac disease:
* A groupby on cardio and cholesterol and performing a mean shows that cholesterol levels more than 240 had a higher chance of developing heart disease.
* Normal cholesterol level has a lesser chance of developing heart disease.

### Effect of high glucose on developing Cardiac disease:
* A groupby on cardio and glucose and performing a mean shows that high glucose levels had a higher chance of developing heart disease.
* Normal glucose level has a lesser chance of developing heart disease.

### Effect of gender on developing Cardiac disease:
* From this dataset, both male and female are at equal risk of developing heart disease.

### Effect of alcohol consumption on developing Cardiac disease:
* From this dataset, it is evident that alcohol consumption alone with no other underlying condition has no effect on developing heart disease.
* It is yet to be explored if alcohol consumption along with other underlying medical condition has an effect on developing heart disease.
## Questions expected to be answered with our Machine Learning model

* Is a person at risk of heart disease?
* What are the potential risk factors for heart disease--smoking, alcohol consumption, obesity, etc?
* Which factors are the best predictors of heart disease?

## Machine learning models that will used in our analyses

* Our dataset is large with over 60 thousand observations and 11 features. 
* Our aim is to predict presence of heart disease. Hence accuracy is an important determinat in selecting our model.
* We try different machine learning algorithms to compare and determine the model that will predict presence of heart disease timely and accurately.
* Our machine learning model will be a classification model since we have a target variable and which is if the person has a heart disease or not. Hence, the two possible outcomes are: "Yes" or "No".
* We will be employing supervised machine learning and artificial neural network algorithms for our analysis.
* The supervised machine learning algorithms we will be using are : 1) Logistic regression, 2) Support vector machine, 3) Random Forests, 4) Gradient Boosting.
*  We will also be usuing basic neural networks and deep neural network models. These are suitable for interpreting large, complex data and non-linear relationships. They also allows optimizing the model and produce high accuracy results.

