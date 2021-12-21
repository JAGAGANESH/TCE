import socket
client=socket.socket()
client1=socket.socket()
client.connect((socket.gethostname(),5000))
while(True):
    print("1.Key exchange\n2.Discretelog\n3.MiddleMan")
    c=int(input("Enter Choice"))
    client.send(str(c).encode())
    if c==1:
        q=int(input("Enter Prime number"))
        alpha=int(input("Enter Prim root"))
        x=int(input("Enter Private Key"))
        y=pow(alpha,x,q)
        client.send(str(q).encode())
        client.send(str(alpha).encode())
        client.send(str(y).encode())
        yb=client.recv(1024).decode()
        print(yb)
        k=pow(int(yb),x,int(q))
        print(k)
    elif c==3:
        client1.connect(('127.0.0.1',8000))
        y=client1.recv(1024).decode()
        print(y)
        client1.close()
        x=client.recv(1024).decode()
        print(x)
        
    else:
        break
        client.close()
    
