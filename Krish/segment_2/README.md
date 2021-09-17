# Be Heart Smart ❤

![image](https://mreib.weebly.com/uploads/5/8/8/0/58809365/heart-health-weeks-banner-jpg-pagespeed-ce-21mh32ls99_orig.jpg)

## Database: 
A cardio cleaned table is created in PostgreSQL database by using the following schema:

CREATE TABLE cardio_cleaned_again (\
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

CREATE TABLE BMI (\
	id numeric PRIMARY KEY NOT NULL,\
	BMI numeric NOT NULL,\
	weight_status VARCHAR NOT NULL,\
	obesity_status VARCHAR NOT NULL\
);
Once the table is created, the data is imported from the respective csv file.

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
INTO cardio_complete\
FROM cardio_cleaned_again AS c\
INNER JOIN BMI AS b\
ON (c.id = b.id);\

Once the cardio complete table is created, it is then connected to Jupyter notebook using SQL alchemy.

* Once the AWS connection was set up, the joined data table was pulled from the AWS server to our local PostgresSQL server and from here on this table is called into the jupyter notebook for further analysis.

## Data Analysis:

## Effects of cholesterol on developing heart diseases as seen based on gender.
* A code is written that does the groupby function on cardio and cholesterol and the mean is taken to see the number of men and female who develop cardio disease based on their cholesterol levels.
* The cholesterol levels are categorized as normal = 1, moderate = 2 and high =3.
* A grouped bar plot is created using Matplotlib.
### Results:
The interesting facts that showed up in the bar plot are as follows:
* Having normal cholesterol levels, females have a slightly higher risk of developing heart diseases than males.
* Even with moderate cholesterol levels, females have a slightly higher risk of developing heart diseases than males.
* Interestingly, with high cholesterol levels, males have a higher risk of developing heart disease than males.
* The association between testosterone and cholesterol levels is long known. As men age, their bodies make less testosterone, hence older men are more likely to have heart problems and high cholesterol.

## Effects of glucose on developing heart diseases as seen based on gender.
* A code is written that does the groupby function on cardio and glucose and the mean is taken to see the number of men and female who develop cardio disease based on their glucose levels.
* The glucose levels are categorized as normal = 1, moderate = 2 and high =3.
* A grouped bar plot is created using Matplotlib.
### Results:
The facts that showed up in the bar plot are as follows:
* With normal, moderate and high glucose levels, both males and females are at equal risk of developing heart diseases.

## Neural Network on the cardio complete dataset.
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
## Best results:
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





