import java.net.*;
import java.io.*;
import java.util.*;
import java.lang.Math;
import java.math.BigInteger;

class UserA {
    
    public static BigInteger discreteKey(BigInteger y,BigInteger a,BigInteger p){
        
        BigInteger i;
        System.out.println("i\tx\ty");
        for(i=BigInteger.ONE;i.compareTo(p)<0;i=i.add(BigInteger.ONE)){
            BigInteger x=a.modPow(i, p);      
            System.out.println(i+"\t"+x+"\t"+y);
            if(x.equals(y)){
                break;
            }
        }
        return i;
    }
    
    public static BigInteger ManInTheMiddle(BigInteger Xd,BigInteger a,BigInteger p){
        BigInteger Yb1=a.modPow(Xd, p);
        return Yb1;
    }
    
    public static void writeBigInteger(BigInteger integer, DataOutputStream out) throws IOException {
        
        if (integer.signum() == -1) {
            throw new IllegalStateException("Negative BigInteger!");
        }
        byte[] buf = integer.toByteArray();
        if (buf.length > Short.MAX_VALUE) {
            throw new IllegalStateException("Too long: " + buf.length);
        }
        out.writeShort((short) buf.length);
        out.write(buf);
    }
    public static BigInteger readBigInteger(DataInputStream dis) throws IOException {
        short i = dis.readShort();
        if (i < 0) {
            throw new IOException("Invalid BigInteger length: " + i);
        }
        byte[] buf = new byte[i];
        dis.readFully(buf);
        return new BigInteger(1, buf);
    }
    
    public static void main(String args[]) throws IOException{
		System.out.println("\t******************************\n\t*\tD.JAGAGANESH         *\n\t*     TCE_IT_5S_ISL_EX4      *\n\t******************************\n");
		Scanner sc=new Scanner(System.in);
		System.out.println("~ Alice \n");
		ServerSocket ss = new ServerSocket(5555);
		Socket s = ss.accept();

		DataInputStream in = new DataInputStream(s.getInputStream());
		DataOutputStream out= new DataOutputStream(s.getOutputStream());
		
		System.out.println("Key Exchangeing");
		    BigInteger p=readBigInteger(in);
		    BigInteger a=readBigInteger(in);
		    System.out.println("\nPublic Numbers ==> (P = "+p+",G = "+a+")\n");
		    System.out.print("Enter Alice Private Number : ");
		    BigInteger Xb=sc.nextBigInteger();
		    BigInteger Yb=a.modPow(Xb,p);
		    writeBigInteger(Yb,out);
		    BigInteger Ya=readBigInteger(in);
		    System.out.println("\nAlice Public Key ==> "+Ya);
		    BigInteger key=Ya.modPow(Xb, p);
		    System.out.println("\nShared secret Key ==> "+key); 
		
		System.out.println("\n~Man in Middle Attack");
		    System.out.print("Enter Alice Public key:");
		    BigInteger Xd=sc.nextBigInteger();
		    BigInteger Yb1=ManInTheMiddle(Xd,a,p);
		    writeBigInteger(Yb1,out);
		    BigInteger Ya1=readBigInteger(in);
		    System.out.println("\nThe Bobs Public Key : "+Ya1);
		    BigInteger k=Ya1.modPow(Xb,p);
		    System.out.println("\nThe Secret key of Alice guesed by Eve : "+k);    
		    
		in.close();
		s.close();
		ss.close();
		System.out.println();
    }
}
