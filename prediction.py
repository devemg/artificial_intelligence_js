from sklearn.linear_model import LinearRegression  
from sklearn.preprocessing import PolynomialFeatures 
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np

#CARGAR LA DATA 
x = np.asarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108])[:,np.newaxis]
y = np.asarray([1,5,20,60,90,120,180,220,340,410,626,625,625,625,625,625,625,624,624,624,624,623,623,623,623,622,622,622,622,621,621,620,620,620,620,619,619,618,618,618,618,617,617,617,616,615,614,614,614,613,611,611,611,610,610,610,609,608,607,607,606,606,605,605,604,603,602,602,602,601,600,599,598,596,595,595,595,593,592,591,590,588,588,588,586,585,583,581,580,579,579,577,575,572,569,567,566,566,563,560,557,553,550,550,549,546,542,538,534])[:,np.newaxis]
plt.scatter(x,y)

#REGRESION
poly_degree = 8
polynomial_features = PolynomialFeatures(degree = poly_degree)
x_transform = polynomial_features.fit_transform(x)
model = LinearRegression().fit(x_transform, y)
y_new = model.predict(x_transform)
rmse = np.sqrt(mean_squared_error(y, y_new))
r2 = r2_score(y, y_new)
print('RMSE: ', rmse)
print('R2: ', r2)
x_new_min = 0.0
x_new_max = 10.0
x_new = np.linspace(x_new_min, x_new_max, 10)
x_new = x_new[:,np.newaxis]
x_new_transform = polynomial_features.fit_transform(x_new)
y_new = model.predict(x_new_transform)

#  GRAFICA
plt.plot(x_new, y_new, color='red', linewidth=3)
plt.grid()
plt.xlim(x_new_min,x_new_max)
plt.ylim(0,500)
title = 'Degree = {}; RMSE = {}; R2 = {}'.format(poly_degree, round(rmse,2), round(r2,2))
plt.title("Prediccion casos para enero 2022 en Guatemala\n " + title, fontsize=10)
plt.xlabel('Cant. Infectados')
plt.ylabel('Dias')
plt.show()