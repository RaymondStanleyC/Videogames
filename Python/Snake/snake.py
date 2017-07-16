import random
import os

tablero = []
d = "w"
ancho = 20
alto = 20
cabeza_alto = 9
cabeza_ancho = 9
comida = "c"
espacioLibre = "."
serpiente = "#"
tamanoSerpiente = 2


def inicializarTablero():

    for i in range(0, alto):
        fila = []
        for j in range(0, ancho):
            fila.append(espacioLibre)
        tablero.append(fila)
    tablero[cabeza_alto][cabeza_ancho + 1] = 2
    tablero[cabeza_alto][cabeza_ancho] = 1
    ponerComida()

    return

def ponerComida():
    comida_alto = random.randint(0, alto-1)
    comida_ancho = random.randint(0, ancho-1)
    if(tablero[comida_alto][comida_ancho] == espacioLibre):
        tablero[comida_alto][comida_ancho] = comida
    else:
        ponerComida()

def imprimirTablero():
    os.system('cls' if os.name == 'nt' else 'clear')
    print ("Tablero Actual")
    print ("w: arriba")
    print ("s: abajo")
    print ("a: izquierda")
    print ("d: derecha")
    for i in range(0, alto):
        print ("")
        for j in range(0, ancho):
            if(tablero[i][j] != "." and tablero[i][j] != "c"):
                print (serpiente),
            else:
                print (tablero[i][j]),
    print ("")
    return

def corre():
    bandera = True
    while(bandera):
        imprimirTablero()
        x = raw_input()
        if(x == "w" or x == "s" or x == "a" or x == "d"):
            global d
            d = x;
            bandera = mover(cabeza_alto, cabeza_ancho, 1)
    return

def mover(nodo_alto, nodo_ancho, actual):
    global cabeza_ancho
    global cabeza_alto
    global d
    global tamanoSerpiente

    if(d == "w"):

        if(tablero[nodo_alto - 1][nodo_ancho] == comida):
            tamanoSerpiente = tamanoSerpiente + 1
            ponerComida()

        if (nodo_alto - 1 == -1 or (tablero[nodo_alto - 1][nodo_ancho] != "." and tablero[nodo_alto - 1][nodo_ancho] != "c")):
            print ("Perdiste")
            return False

        if (tablero[nodo_alto - 1][nodo_ancho] != "." and tablero[nodo_alto - 1][nodo_ancho] != "c"):
            print ("Mal movimiento")
            return True


        tablero[nodo_alto - 1][nodo_ancho] = actual
        tablero[nodo_alto][nodo_ancho] = "."

        if(actual == 1):
            cabeza_alto = cabeza_alto - 1
            cabeza_ancho = cabeza_ancho

        #Si voy a la derecha y le doy arriba
        if(nodo_ancho - 1 > -1 and tablero[nodo_alto][nodo_ancho - 1] == actual + 1):
            d = "d"
            return mover(nodo_alto, nodo_ancho - 1, actual + 1)

        # Si voy a la izquierda y le doy arriba
        elif (nodo_ancho + 1 < ancho and tablero[nodo_alto][nodo_ancho + 1] == actual + 1):
            d = "a"
            return mover(nodo_alto, nodo_ancho + 1, actual + 1)

        elif (actual < tamanoSerpiente):
            return mover(nodo_alto + 1, nodo_ancho, actual + 1)

        return True

    if (d == "s"):

        if (tablero[nodo_alto + 1][nodo_ancho] == comida):
            tamanoSerpiente = tamanoSerpiente + 1
            ponerComida()

        if (nodo_alto + 1 == alto or (
                        tablero[nodo_alto + 1][nodo_ancho] != "." and tablero[nodo_alto + 1][nodo_ancho] != "c")):
            print ("Perdiste")
            return False

        if (tablero[nodo_alto + 1][nodo_ancho] != "." and tablero[nodo_alto + 1][nodo_ancho] != "c"):
            print ("Mal movimiento")
            return True

        tablero[nodo_alto + 1][nodo_ancho] = actual
        tablero[nodo_alto][nodo_ancho] = "."

        if (actual == 1):
            cabeza_alto = cabeza_alto + 1
            cabeza_ancho = cabeza_ancho

        # Si voy a la derecha y le doy abajo
        if (nodo_ancho - 1 > -1 and tablero[nodo_alto][nodo_ancho - 1] == actual + 1):
            d = "d"
            return mover(nodo_alto, nodo_ancho - 1, actual + 1)

        # Si voy a la izquierda y le doy abajo
        elif (nodo_ancho + 1 < ancho and tablero[nodo_alto][nodo_ancho + 1] == actual + 1):
            d = "a"
            return mover(nodo_alto, nodo_ancho + 1, actual + 1)

        elif (actual < tamanoSerpiente):
            return mover(nodo_alto - 1, nodo_ancho, actual + 1)

        return True

    if (d == "a"):

        if (tablero[nodo_alto][nodo_ancho - 1] == comida):
            tamanoSerpiente = tamanoSerpiente + 1
            ponerComida()

        if (nodo_ancho - 1 == -1 or (
                        tablero[nodo_alto][nodo_ancho - 1] != "." and tablero[nodo_alto][nodo_ancho - 1] != "c")):
            print ("Perdiste")
            return False

        if (tablero[nodo_alto][nodo_ancho - 1] != "." and tablero[nodo_alto][nodo_ancho - 1] != "c"):
            print ("Mal Movimiento")
            return True

        tablero[nodo_alto][nodo_ancho - 1] = actual
        tablero[nodo_alto][nodo_ancho] = "."

        if (actual == 1):
            cabeza_alto = cabeza_alto
            cabeza_ancho = cabeza_ancho - 1

        # Si voy arriba y le doy a la derecha
        if (nodo_alto - 1 > -1 and tablero[nodo_alto - 1][nodo_ancho] == actual + 1):
            d = "s"
            return mover(nodo_alto - 1, nodo_ancho , actual + 1)

        # Si voy abajo y le doy a la derecha
        elif (nodo_alto + 1 < alto and tablero[nodo_alto + 1][nodo_ancho] == actual + 1):
            d = "w"
            return mover(nodo_alto + 1, nodo_ancho, actual + 1)

        elif (actual < tamanoSerpiente):
            return mover(nodo_alto, nodo_ancho + 1, actual + 1)

        return True

    if (d == "d"):

        if (tablero[nodo_alto][nodo_ancho + 1] == comida):
            tamanoSerpiente = tamanoSerpiente + 1
            ponerComida()

        if (nodo_ancho + 1 == ancho or (
                        tablero[nodo_alto][nodo_ancho + 1] != "." and tablero[nodo_alto][nodo_ancho + 1] != "c")):
            print ("Perdiste")
            return False

        if (tablero[nodo_alto][nodo_ancho + 1] != "." and tablero[nodo_alto][nodo_ancho + 1] != "c"):
            print ("Mal Movimiento")
            return True

        tablero[nodo_alto][nodo_ancho + 1] = actual
        tablero[nodo_alto][nodo_ancho] = "."

        if (actual == 1):
            cabeza_alto = cabeza_alto
            cabeza_ancho = cabeza_ancho + 1

        # Si voy arriba y le doy a la derecha
        if (nodo_alto - 1 > -1 and tablero[nodo_alto - 1][nodo_ancho] == actual + 1):
            d = "s"
            return mover(nodo_alto - 1, nodo_ancho, actual + 1)

        # Si voy abajo y le doy a la derecha
        elif (nodo_alto + 1 < alto and tablero[nodo_alto + 1][nodo_ancho] == actual + 1):
            d = "w"
            return mover(nodo_alto + 1, nodo_ancho, actual + 1)

        elif (actual < tamanoSerpiente):
            return mover(nodo_alto, nodo_ancho - 1, actual + 1)

        return True



    return True

def juego():
    inicializarTablero()
    corre()

    return

def menu():
    x = raw_input("Para comenzar el juego pulse enter")
    juego()

menu()