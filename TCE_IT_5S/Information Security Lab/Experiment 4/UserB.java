import java.net.*;
import java.io.*;
import java.math.BigInteger;
import java.util.*;
class UserB {
    
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
    public static BigInteger ManInTheMiddle(BigInteger Xc,BigInteger a,BigInteger p){
        BigInteger Ya1=a.modPow(Xc,p);
        return Ya1;
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
    
    public static void main(String args[]) throws Exception {
    	System.out.println("\t******************************\n\t*\tD.JAGAGANESH         *\n\t*     TCE_IT_5S_ISL_EX4      *\n\t******************************\n");
        Scanner sc=new Scanner(System.in);
		System.out.println("~ Bob \n");
        Socket s = new Socket("localhost", 5555);
        DataInputStream in = new DataInputStream(s.getInputStream());
        DataOutputStream out = new DataOutputStream(s.getOutputStream());
        System.out.print("Key Exchangeing\n");        
            System.out.print("Enter prime numper of P : ");
            BigInteger p=sc.nextBigInteger();
            writeBigInteger(p,out);
            System.out.print("Enter prime numper of G : ");
            BigInteger a=sc.nextBigInteger();
		    System.out.println("\nPublic Numbers ==> (P = "+p+",G = "+a+")\n");
            writeBigInteger(a,out);
            System.out.print("Enter Bobs Private Number : ");
            BigInteger Xa=sc.nextBigInteger();
            BigInteger Ya=a.modPow(Xa,p);
            writeBigInteger(Ya,out);
            BigInteger Yb=readBigInteger(in);
            System.out.println("\nBobs Public Key ==> "+Yb);
            BigInteger key=Yb.modPow(Xa,p);
            System.out.println("\nShared secret Key ==> "+key);
        
        System.out.print("\n~Man in Middle Attack\n");
            System.out.print("Enter Bob Public key :");
            BigInteger Xc=sc.nextBigInteger();
            BigInteger Ya1=ManInTheMiddle(Xc,a,p);
            writeBigInteger(Ya1,out);
            BigInteger Yb1=readBigInteger(in);
            System.out.println("\nThe Alice Public Key : "+Yb1);
            BigInteger k=Yb1.modPow(Xa, p);
            System.out.println("\nThe Secret key of Bob guesed by Eve : "+k);
            System.out.println("");
        out.close();
        s.close();
        System.out.println();
    }
}
