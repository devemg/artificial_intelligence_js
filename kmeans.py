"""
Clasificar medicinas 
efectividad teórica de 10
pH balanceado de 7
k-means
Manhattan
Centroide 10,7
"""
from sklearn.cluster import KMeans
import numpy as np

import matplotlib.pyplot as plt

data=np.array([[8,2],[9,7],[2,12],[9,1],[10,7],[3,14],[8,1],[1,13]])

kmeans = KMeans(n_clusters=1, init=np.array([[10,7]]), n_init=1)
kmeans.fit(data)

print(kmeans.cluster_centers_)
plt.scatter(data[:,0],data[:,1], c=kmeans.labels_, cmap='rainbow')
plt.show()