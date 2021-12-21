import socket
server=socket.socket()
server.bind((socket.gethostname(),5000))
server.listen(2)
conn,addr=server.accept()
server1=socket.socket()

while(True):
    c=conn.recv(1024).decode()
    if c=='1':
        q=conn.recv(1024).decode()
        alpha=conn.recv(1024).decode()
        y=conn.recv(1024).decode()
        print("Prime is:",q)
        print("primroot is:",alpha)
        x=int(input("Enter Private Key"))
        yb=pow(int(alpha),x,int(q))
        conn.send(str(yb).encode())
        print(y)
        k=pow(int(y),x,int(q))
        print(k)
        
    elif c=='3':
        q=int(input("Enter Prime number"))
        alpha=int(input("Enter Prim root"))
        x=int(input("Enter Private Key"))
        y=pow(alpha,x,q)
        conn.send(str(y).encode())
        
        
    else:
        break
        conn.close()

