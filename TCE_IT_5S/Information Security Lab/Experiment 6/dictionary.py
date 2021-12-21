import hashlib
alpha="abcdefghijklmnopqrstuvwxyz"
l=[]
d={}
for i in alpha:
    for j in alpha:
        l.append(i+j)
for i in l:
    d[i]=hashlib.sha256(i.encode()).hexdigest()
print(d)
print(l)
        