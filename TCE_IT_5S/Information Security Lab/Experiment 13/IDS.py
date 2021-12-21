import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score

#Read CSV FIle
data = pd.read_csv("C:\\Users\duja\Desktop\income.csv")
#data = pd.read_csv("/content/drive/MyDrive/TCE/Fifth Semester/Information Security Lab/Codes/income.csv")

data = pd.read_csv("C:\\Users\duja\Desktop\income.csv", na_values=[' ?'])
print(data.isnull().sum())

missing=data[data.isnull().any(axis=1)]
data1=data.dropna(axis=0)

data1['salstat']=data['salstat'].map({' <=50K':0, " >50K":1})
new_data = pd.get_dummies(data1,drop_first=True)

columns_list=list(new_data.columns)
#features=columns_list[0:4]+columns_list[5:]
features=list(set(columns_list)-set(['salstat']))

x=new_data[features].values
y=new_data['salstat'].values

train_x, test_x, train_y, test_y=train_test_split(x,y,test_size=0.4)

l=LogisticRegression(max_iter = 20000)
l.fit(train_x, train_y)
predict2=l.predict(test_x)
cm=confusion_matrix(test_y, predict2)
a=accuracy_score(test_y, predict2)
print(a)
print((test_y!=predict2).sum())
