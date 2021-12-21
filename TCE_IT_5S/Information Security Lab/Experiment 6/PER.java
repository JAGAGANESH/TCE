import java.security.MessageDigest;
import java.util.*;

public class PER {
    static String[] words() {
        String[] arr = new String[676];
        int x = 0 ;
        for(int i=65;i<91;i++) {
            for(int j=65;j<91;j++) {
                char a  = (char) (i);
                char b  = (char) (j);
                String pattern = ""+a+b;
                arr[x] = pattern;
                x++;
            }
        }
        return arr;
    }
    
    static String sha256(final String base) {
		try {
		    final MessageDigest digest = MessageDigest.getInstance("SHA-256");
		    final byte[] hash = digest.digest(base.getBytes("UTF-8"));
		    final StringBuilder hexString = new StringBuilder();
		    for (int i = 0; i < hash.length; i++) {
		        final String hex = Integer.toHexString(0xff & hash[i]);
		        if(hex.length() == 1) 
		          hexString.append('0');
		        hexString.append(hex);
		    }
		    return hexString.toString();
		}
		catch(Exception ex) {
			throw new RuntimeException(ex);
		}
	}
    
    static String[] hash_combinations(String[] array) {
        String[] has_array = new String[676];
        for(int i=0;i<array.length;i++) {
            String hash = sha256(array[i]);
            has_array[i] = hash;
        }
        return has_array;
	}
	
	public static void main(String[] args) {
	    Scanner scan = new Scanner(System.in);
	    
		System.out.println(". . . . . . .\nGenerating the words for Dictionary attack . . .\n");
		String[] combinations_array       = words();
		
	    System.out.println("Generating the corresponding hash for the words . . . \nNow we have the dictionary for 676 combinations of passwords and their hash\n");
		String[] hash_combinations_array  = hash_combinations(combinations_array);

		System.out.println("Enter the (password/hash) to crack: ");
    	String has_input = scan.next();
		System.out.println("The hash for this password is : "+sha256(has_input));
		String has = sha256(has_input);
    	for(int i=0;i<hash_combinations_array.length;i++) {
			if(hash_combinations_array[i].equals(has)) {
				System.out.println("The Cracked Password is : "+combinations_array[i]+"\n"+"Location in the dictionary : "+i);
			}
		}
		
	}
}


