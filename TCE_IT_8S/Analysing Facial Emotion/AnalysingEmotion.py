import cv2
from fer import FER
import time
import tkinter
from tkinter import ttk
import os
import datetime
from PIL import ImageGrab
# import ShapeGame

class AnalysingEmotion:
    def Box(self):
        root = tkinter.Tk()
        root.geometry("300x300")
        root.title("Analysing Facial Emotion")
        l1 = tkinter.Label(root, text="At 5.0 s")
        l2 = tkinter.Label(root, text="Happy")
        tkinter.Label(root, text="Hello").pack()
        # l1.grid(row=0,column=0,padx=25,pady=25)
        # l2.grid(row=0,column=1,padx=25,pady=25)
        l1.pack()
        l2.pack()
        tkinter.mainloop()

    def AFE_Report(self):
        global report, ListBox
        today = datetime.date.today()
        date_str = today.strftime("%d.%m.%y")
        report = tkinter.Tk()
        report.title("AFE Report")
        screen_width = report.winfo_screenwidth()
        screen_height = report.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        report.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        report.config(bg="#A52A2A")
        TitleData = str(ChildrenName)+" ("+str(ChildrenAge)+" years old)\nReport ("+str(date_str)+")"
        NameLable = tkinter.Label(report, text=TitleData, font=('Arial', 20), bg='#A52A2A', fg='#8F00FF')
        NameLable.pack(padx=10, pady=5)
        ListBox = tkinter.Listbox(bg="#A52A2A",font=("Helvetica",14,'bold'),fg = "yellow",height=window_height)
        report.protocol("WM_DELETE_WINDOW", self.ReportWIndowAccessCloseButton)
        # report.mainloop()

    def PackTheReport(self, s, data, textData):
        # tkinter.Label(report, text=data).pack()
        ListBox.insert(s,data)
        TextFile.write(textData)


    def CameraVideoAction(self):
        capture_duration = 20
        emotion_detector = FER()
        self.AFE_Report()
        webcam = cv2.VideoCapture(0) 
        start_time = time.time()
        seconds = 0
        while(True):
            ret, image = webcam.read() 
            emotion_name, score = emotion_detector.top_emotion(image)
            cv2.putText(image,emotion_name,(50,50), cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0),2,cv2.LINE_AA)
            # print(emotion_name," -- ",int(time.time() - start_time))
            cv2.imshow("ImageWindow", image)
            if(seconds!=int(time.time() - start_time)):
                m, s = divmod(seconds, 60)
                h, m = divmod(m, 60)
                time_string = f"{h:02d}.{m:02d}.{s:02d}"
                # print("At ",time_string," -- ",emotion_name)
                if(emotion_name!=None):
                    data = "At    "+str(time_string)+"    -->    "+str(emotion_name)
                    rawData = "("+str(seconds)+","+str(emotion_name)+")\n"
                    self.PackTheReport(seconds, data, rawData)
                    CvWindowName = "ImageWindow"
                    ScreenshotName = folder2_path+"/"+emotion_name+"_"+str(time_string)+".png"
                    self.TakeScreenshootOfOpenCV(CvWindowName, ScreenshotName)
                    # cv2.imwrite(ScreenshotName, CvWindowName)
            seconds = int(time.time() - start_time)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        webcam.release() 
        # video_file.release()
        cv2.destroyAllWindows()
        ListBox.pack(fill="both")
        report.mainloop()
        TextFile.write("\n--------------------------------\n")
        TextFile.close()

    def CollectUserData(self):
        global UserDetailWindow, NameInput, AgeInput
        UserDetailWindow = tkinter.Tk()
        UserDetailWindow.title("Childrens Details")
        screen_width = UserDetailWindow.winfo_screenwidth()
        screen_height = UserDetailWindow.winfo_screenheight()
        center_x = int(screen_width / 2)
        center_y = int(screen_height / 2)
        window_width = 500
        window_height = 500
        window_x = center_x - int(window_width / 2)
        window_y = center_y - int(window_height / 2)
        UserDetailWindow.geometry(f"{window_width}x{window_height}+{window_x}+{window_y}")
        UserDetailWindow.config(bg="#ADD8E6")
        style = ttk.Style()
        style.configure("Custom.TButton", font=("Algerian", 14), foreground="red", background="Yellow", padding=10)
        NameLable = tkinter.Label(UserDetailWindow, text="Name : ", font=('Arial', 20), bg='#ADD8E6', fg='#8F00FF')
        AgeLable = tkinter.Label(UserDetailWindow, text="Age : ", font=('Arial', 20), bg='#ADD8E6', fg='#8F00FF')
        NameInput = tkinter.Entry(UserDetailWindow, font=('Arial', 20), bg='#ffffff', fg='red', bd=0, relief='solid',width=15)
        AgeInput = tkinter.Entry(UserDetailWindow, font=('Arial', 20), bg='#ffffff', fg='red', bd=0, relief='solid',width=15)
        button = ttk.Button(UserDetailWindow, text="Continue", command=self.SetUserInputData, style="Custom.TButton")
        NameLable.pack(padx=10, pady=5)
        AgeLable.pack(padx=10, pady=5)
        NameInput.pack()
        AgeInput.pack()
        button.pack()
        NameLable.place(x=50,y=150)
        AgeLable.place(x=50,y=200)
        NameInput.place(x=150,y=150)
        AgeInput.place(x=150,y=200)
        button.place(x=200, y=250)
        UserDetailWindow.mainloop()

    def SetUserInputData(self):
        global folder_path, ChildrenName, ChildrenAge, folder2_path
        today = datetime.date.today()
        todayTime = datetime.datetime.now()
        date_str = today.strftime("%d.%m.%y")
        time_str = todayTime.strftime("%H.%M.%S")
        ChildrenName = NameInput.get()
        ChildrenAge = AgeInput.get()
        print("Name:", ChildrenName)
        print("Age:", ChildrenAge)
        folder_name = ChildrenName+"_"+ChildrenAge
        folder_path = "./Childrens Data/" + folder_name
        folder2_path = folder_path+"/Emotions ("+date_str+"_"+time_str+")"
        self.CreateTextFile(folder_name)
        try:
            os.mkdir(folder_path)
            os.mkdir(folder2_path)
            print(folder_name,"Folder created successfully!")
            # print(folder2_path,"Folder created successfully!")
        except FileExistsError:
            os.mkdir(folder2_path)
            print(folder_name,"Folder created successfully!")
        except OSError:
            print("Creation of the folder %s failed" % folder_path)
            

        UserDetailWindow.destroy()
        self.CameraVideoAction()
        # self.TakeScreenshoot()

    def TakeScreenshootOfTkinter(self, WindowName, PathName):
        x, y = WindowName.winfo_rootx(), WindowName.winfo_rooty()
        width, height = WindowName.winfo_width(), WindowName.winfo_height()
        screenshot = ImageGrab.grab((x, y, x + width, y + height))
        screenshot.save(folder_path+PathName)
        print("Scrrenshot Taken")
    
    def TakeScreenshootOfOpenCV(self, WindowName, ScreenshotName):
        x, y, w, h = cv2.getWindowImageRect(WindowName)
        screenshot = ImageGrab.grab((x, y, x+w, y+h))
        screenshot.save(ScreenshotName)
    
    def ReportWIndowAccessCloseButton(self):
        today = datetime.date.today()
        todayTime = datetime.datetime.now()
        date_str = today.strftime("%d.%m.%y")
        time_str = todayTime.strftime("%H.%M.%S")
        ScreenshotPath = "/Report ("+date_str+"_"+time_str+").png"
        self.TakeScreenshootOfTkinter(report, ScreenshotPath)
        report.destroy()

    def CreateTextFile(self, FileName):
        global TextFile
        today = datetime.date.today()
        todayTime = datetime.datetime.now()
        date_str = today.strftime("%d.%m.%y")
        time_str = todayTime.strftime("%H.%M.%S")
        TextFile = open("Reports/"+FileName+".txt", "a")
        Content = "Name : "+ChildrenName+"\nAge : "+ChildrenAge+"\nDate : "+date_str+"\nTime : "+time_str+"\nReport:\n"
        TextFile.write(Content)
        # TextFile.close()

# MainObj = AnalysingEmotion()
# MainObj.CollectUserData()