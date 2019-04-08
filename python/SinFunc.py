import matplotlib.pyplot as plt
import math as math
valores = []
t = 0
for x in range(0,200):
    i = math.sin(t)
    t +=0.1
    valores.append(i)
plt.plot(valores)
plt.show()
