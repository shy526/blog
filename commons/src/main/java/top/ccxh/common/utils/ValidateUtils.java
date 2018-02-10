package common.utils;

public class ValidateUtils {
    public static boolean validateEmail(String email){
        if (email!=null&&email!=""){
            return email.matches("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
        }
        return false;
    }
}
