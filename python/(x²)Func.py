import matplotlib.pyplot as plt
import math 
valores = []
x = -200
for i in range(-2000,2000):
    y = -(x**2)
    x += 0.1
    valores.append(y)
plt.plot(valores)
plt.show()