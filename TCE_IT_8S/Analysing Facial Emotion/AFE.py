# import threading
import ShapeGame as sg
import AnalysingEmotion as ae
import multiprocessing

if __name__ == '__main__':
    Game = sg.PlayGame()
    Analytics = ae.AnalysingEmotion()

    # thread1 = threading.Thread(target=ae.CameraVideoAction)
    # thread2 = threading.Thread(target=Game.StartGame)

    process1 = multiprocessing.Process(target=Analytics.CollectUserData)
    process2 = multiprocessing.Process(target=Game.StartGame)

    # thread1.start()
    # thread2.start()
    # thread1.join()
    # thread2.join()

    process2.start()
    process1.start()
    process2.join()
    process1.join()