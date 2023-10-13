export const getPasswordStrength = (password: string): 'strong' | 'medium' | 'easy' => {
    let hasLetters = false;
    let hasDigits = false;
    let hasSymbols = false;
  
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if (/[a-zA-Z]/.test(char)) {
        hasLetters = true;
      } else if (/[0-9]/.test(char)) {
        hasDigits = true;
      } else {
        hasSymbols = true;
      }
    }
  
    if (hasLetters && hasDigits && hasSymbols) {
      return 'strong';
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
      return 'medium';
    } else {
      return 'easy';
    }
  }
  