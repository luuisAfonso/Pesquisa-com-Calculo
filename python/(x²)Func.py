import matplotlib.pyplot as plt
import math 
valores = []
x = -200
times = 4000
for i in range(times): 
    y = -(x**2) + 10*x + 24
    x += 0.1
    valores.append(y)
plt.plot(valores)
plt.show()