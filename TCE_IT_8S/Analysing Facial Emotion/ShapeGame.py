import tkinter as tk
from tkinter import ttk
import random
import cv2
import pygame

class PlayGame:
    def StartGame(self):
        pygame.init()
        global StartWindow
        StartWindow = tk.Tk()
        StartWindow.title("Start Game")
        screen_width = StartWindow.winfo_screenwidth()
        screen_height = StartWindow.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        StartWindow.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        StartWindow.config(bg="#A52A2A")
        style = ttk.Style()
        style.configure("Custom.TButton", font=("Algerian", 14), foreground="red", background="Yellow", padding=10)
        button = ttk.Button(StartWindow, text="Start Game!", command=self.StartGameButton, style="Custom.TButton")
        button.pack()
        button.place(x=200, y=200)
        StartWindow.mainloop()

    def StartGameButton(self):
        StartWindow.destroy()
        self.StartPlaying()
    
    def TryAgainButton(self):
        LoseEndWindow.destroy()
        self.StartPlaying()

    def EndGameButtonFromLose(self):
        LoseEndWindow.destroy()

    def EndGameButtonFromWin(self):
        PlayEndWindow.destroy()

    def PlayAgainButton(self):
        PlayEndWindow.destroy()
        self.StartPlaying()

    def StartPlaying(self):
        global canvas, ShapeCreated, PlayWindow
        PlayWindow = tk.Tk()
        PlayWindow.title("Play Game")
        screen_width = PlayWindow.winfo_screenwidth()
        screen_height = PlayWindow.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        PlayWindow.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        canvas = tk.Canvas(PlayWindow, width=400, height=400)
        canvas.pack()
        ShapeCreated = self.CreateShapes()
        self.CreateAllShapes()
        # border()
        PlayWindow.mainloop()

    def CreateShapes(self):
        number = random.randint(1,5)
        if(number==1):
            cshape = canvas.create_rectangle(100,100,150,150,fill="white",width=0)
            canvas.scale(cshape, 0,0,2,2)
            canvas.move(cshape, -150,-50)
            shape = "square"
        elif(number==2):
            cshape = canvas.create_rectangle(50,100,150,150,fill="white",width=0)
            shape = "rectangle"
            canvas.move(cshape, 0,100)
        elif(number==3):
            cshape = canvas.create_oval(100,100,150,150,fill="white",width=0)
            canvas.scale(cshape, 0,0,2,2)
            canvas.move(cshape, -150,-50)
            shape = "circle"
        elif(number==4):
            cshape = canvas.create_polygon(150, 50, 100, 150, 200, 150,fill="white",width=0)
            shape = "triangle"
            canvas.move(cshape, -50,100)
        else:
            cshape = canvas.create_rectangle(100,100,150,150,fill="white",width=0)
            canvas.scale(cshape, 0,0,2,2)
            canvas.move(cshape, -150,-50)
            shape = "square"
        return shape
    
    def CreateAllShapes(self):
        square = canvas.create_rectangle(100,100,150,150,fill="red",width=0)
        canvas.scale(square, 0,0,2,2)
        canvas.move(square, 100,-190)
        canvas.tag_bind(square, "<ButtonPress-1>", self.start_drag)
        canvas.tag_bind(square, "<B1-Motion>", self.drag)
        circle = canvas.create_oval(100,100,150,150,fill="green",width=0)
        canvas.scale(circle, 0,0,2,2)
        canvas.move(circle, 100,-80)
        canvas.tag_bind(circle, "<ButtonPress-1>", self.start_drag)
        canvas.tag_bind(circle, "<B1-Motion>", self.drag)
        rectangle = canvas.create_rectangle(50,100,150,150,fill="blue",width=0)
        # canvas.scale(rectangle, 0,0,2,2)
        canvas.move(rectangle, 250, 130)
        canvas.tag_bind(rectangle, "<ButtonPress-1>", self.start_drag)
        canvas.tag_bind(rectangle, "<B1-Motion>", self.drag)
        triangle = canvas.create_polygon(150, 50, 100, 150, 200, 150,fill="yellow",width=0)
        # canvas.scale(triangle, 0,0,2,2)
        canvas.move(triangle, 200,240)
        canvas.tag_bind(triangle, "<ButtonPress-1>", self.start_drag)
        canvas.tag_bind(triangle, "<B1-Motion>", self.drag)

    def WinOrLose(self):
        PlayWindow.destroy()
        item = self.NumberToShape()
        if(item==ShapeCreated):
            print("You Are Win")
            self.Congratulations()
        else:
            print("You Are Lose")
            self.TryagainOrEndgame()

    def NumberToShape(self):
        if(selected_item==2):
            return "square"
        elif(selected_item==3):
            return "circle"
        elif(selected_item==4):
            return "rectangle"
        elif(selected_item==5):
            return "triangle"
    
    def Congratulations(self):
        pygame.mixer.music.load('Videos/congratulations.mp3')
        pygame.mixer.music.play()
        video_file = cv2.VideoCapture("Videos/congratulations.mp4")
        cv2.namedWindow('Congratulations', cv2.WINDOW_NORMAL)
        cv2.resizeWindow('Congratulations', 720,405)
        cv2.moveWindow('Congratulations', 350, 200)
        try:
            while(video_file.isOpened()):
                ret_video, frame_video = video_file.read()
                cv2.imshow("Congratulations", frame_video)
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break
        except:
            print("Video Completed")
        
        video_file.release()
        cv2.destroyAllWindows() 
        self.PlayagainOrEndgame()

    def TryagainOrEndgame(self):
        pygame.mixer.music.load('Videos/loosing.mp3')
        pygame.mixer.music.play()
        global LoseEndWindow
        LoseEndWindow = tk.Tk()
        LoseEndWindow.title("Sorry! - Try Aganin | End Game")
        screen_width = LoseEndWindow.winfo_screenwidth()
        screen_height = LoseEndWindow.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        LoseEndWindow.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        LoseEndWindow.config(bg="red")
        style = ttk.Style()
        style.configure("Custom.TButton", font=("Algerian", 14), foreground="red", background="Yellow", padding=10)
        tryAgainButton = ttk.Button(LoseEndWindow, text="Try Again!", command=self.TryAgainButton, style="Custom.TButton")
        endGameButton = ttk.Button(LoseEndWindow, text="End Game!", command=self.EndGameButtonFromLose, style="Custom.TButton")
        tryAgainButton.pack()
        tryAgainButton.place(x=200, y=150)
        endGameButton.pack()
        endGameButton.place(x=200, y=250)
        LoseEndWindow.mainloop()

    def PlayagainOrEndgame(self):
        global PlayEndWindow
        PlayEndWindow = tk.Tk()
        PlayEndWindow.title("Congratulations! - Play Aganin | End Game")
        screen_width = PlayEndWindow.winfo_screenwidth()
        screen_height = PlayEndWindow.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        PlayEndWindow.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        PlayEndWindow.config(bg="green")
        style = ttk.Style()
        style.configure("Custom.TButton", font=("Algerian", 14), foreground="Green", background="Yellow", padding=10)
        tryAgainButton = ttk.Button(PlayEndWindow, text="Play Again!", command=self.PlayAgainButton, style="Custom.TButton")
        endGameButton = ttk.Button(PlayEndWindow, text="End Game!", command=self.EndGameButtonFromWin, style="Custom.TButton")
        tryAgainButton.pack()
        tryAgainButton.place(x=200, y=150)
        endGameButton.pack()
        endGameButton.place(x=200, y=250)
        PlayEndWindow.mainloop()

    def start_drag(self, event):
        canvas.data = {"x": event.x, "y": event.y}
        global selected_item
        selected_item = canvas.find_withtag(tk.CURRENT)[0]
        canvas.bind("<ButtonRelease-1>", self.on_drag_release)
        
    def drag(self, event):
        dx = event.x - canvas.data["x"]
        dy = event.y - canvas.data["y"]
        canvas.move(tk.CURRENT, dx, dy)
        canvas.data = {"x": event.x, "y": event.y}

    def on_drag_release(self, event):
        if(event.x>15 and event.x<190 and event.y>125 and event.y<295):
            self.WinOrLose()

    def border(self):
        line = canvas.create_line(10, 100, 10, 300)
        line = canvas.create_line(200, 100, 200, 300)
        line = canvas.create_line(10, 100, 200, 100)
        line = canvas.create_line(10, 300, 200, 300)

# maniobj = PlayGame()
# maniobj.StartGame()