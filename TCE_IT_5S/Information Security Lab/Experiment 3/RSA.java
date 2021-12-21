import java.util.*;
import java.math.*;

public class RSA {

	public boolean gcd(BigInteger e, BigInteger phi) {
		BigInteger gcd_value = e.gcd(phi);
		if(gcd_value.compareTo(BigInteger.valueOf(1))==0) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public BigInteger decryptkey(BigInteger phi, BigInteger e) {
		BigInteger a=phi,b=e,q,r,t,t1,t2;
		t1=BigInteger.valueOf(0);
		t2=BigInteger.valueOf(1);
		while(!(b.equals(BigInteger.valueOf(0)))) {
			q=a.divide(b);
			r=a.mod(b);
			t=t1.subtract(q.multiply(t2));
			a=b;
			b=r;
			t1=t2;
			t2=t;
		}
		if(t1.compareTo(BigInteger.valueOf(0))==-1) {
			t1=t1.add(phi);
		}
		return t1;
	}
	
	public BigInteger encrypt(BigInteger plain, BigInteger e, BigInteger n) {
		return plain.modPow(e, n);
	}
	
	public BigInteger decrypt(BigInteger cipher, BigInteger d, BigInteger n) { {
		return cipher.modPow(d, n);
	}
	
	public static void main(String[] args) {
		Scanner Sc = new Scanner(System.in);
		RSA rsa = new RSA();
        String  alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		//-----------------------------------------------------------------------------------	
		System.out.println("\n~~Key Generatiion\n");
        System.out.print("Enter the prime number value of p : ");
        BigInteger p = Sc.nextBigInteger();
        System.out.print("Enter the prime number value of q : ");
        BigInteger q = Sc.nextBigInteger();
        n = p.multiply(q);
        BigInteger one = BigInteger.valueOf(1);
                    
        BigInteger phi = (p.subtract(one)).multiply((q.subtract(one)));

        while(true) {
        	System.out.print("Enter the value of e : ");
            e = Sc.nextBigInteger();
            if(rsa.gcd(e,phi)==true) {
            	break;
            }
            else {
            	System.out.println("\n!!! e value is not accepted, Enter again");
            }
        }
        d = rsa.decryptkey(phi, e);
        System.out.println();
        System.out.println("Public Key --> ("+e+", "+n+")");
        System.out.println("Private Key --> ("+d+", "+n+")");
		//---------------------------------------------------------------------------------------
		
		//---------------------------------------------------------------------------------------
		System.out.print("Enter value of n : ");
        n=Sc.nextBigInteger();
        System.out.print("Enter encrypt key : ");
        e=Sc.nextBigInteger();
        System.out.print("Enter the character : ");
        String pt = Sc.next().toUpperCase();
        System.out.print("Encrypted Keys : ");
        for(int i=0;i<pt.length();i++) {
        	BigInteger plain = BigInteger.valueOf(alpha.indexOf(pt.charAt(i)));
            System.out.print(rsa.encrypt(plain, e, n)+" ");
        }
        //-----------------------------------------------------------------------------------------
        
        //-----------------------------------------------------------------------------------------
		System.out.print("Enter value of n : ");
        n=Sc.nextBigInteger();
        System.out.print("Enter decrypt key : ");
        d=Sc.nextBigInteger();
        System.out.print("Enter number of characters : ");
        int num_char=Sc.nextInt();
        BigInteger[] Cipher_arr=new BigInteger[num_char];
        for(int i=0;i<num_char;i++) {
        	Cipher_arr[i]=Sc.nextBigInteger();
        }
        System.out.print("Plain text:");
        for(int i=0;i<num_char;i++) {
        	System.out.print(alpha.charAt(rsa.decrypt(Cipher_arr[i], d, n).intValue()));
        }
		//-------------------------------------------------------------------------------------------
	
	}

}
