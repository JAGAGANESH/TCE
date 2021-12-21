def Encrypt(p,pub):
    alpha="abcdefghijklmnopqrstuvwxyz"
    l=[]
    cipher=[]
    for i in p:
        l.append(alpha.index(i))
    for i in l:
        c=pow(i,pub[0],pub[1])
        cipher.append(c)
    return cipher
def Decrypt(c,pvt):
    l=[]
    alpha="abcdefghijklmnopqrstuvwxyz"
    for i in c:
        x=pow(i,pvt[0],pvt[1])
        l.append(alpha[x])
    return "".join(l)
def mul_inv(a,b):
    a,b=max(a,b),min(a,b)
    x=a
    t1=0
    t2=1
    while(b!=0):
        q=a//b
        r=a%b
        a=b
        b=r
        t=t1-q*t2
        t1=t2
        t2=t
    if a==1:
        return t1%x
    else:
        return "No inverse"
    
while(True):
    print("1.Key Gen\n2.Encrypt\n3.Decrypt")
    c=int(input("enter choice"))
    if c==1:
        pub,pvt=[],[]
        p=int(input("Enter prime:"))
        q=int(input("Enter prime:"))
        n=p*q
        phy=(p-1)*(q-1)
        e=int(input("Enter Public Key"))
        d=mul_inv(phy,e)
        pub.append(e)
        pvt.append(d)
        pub.append(n)
        pvt.append(n)
        print("public Key",pub)
        print("private key",pvt)

    if c==2:
        pt=input("Enter Text")
        pub=list(map(int,input("Enter pub key:").split(",")))
        print(Encrypt(pt,pub))
    if c==3:
        cipher=list(map(int,input("Enter cipher").split(",")))
        pub=list(map(int,input("Enter pub key:").split(",")))
        print(Decrypt(cipher,pvt))
        
        