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

