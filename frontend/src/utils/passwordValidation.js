export const validatePassword = (password, userName = "", userEmail = "") => {
  const result = {
    length: password.length >= 8 && password.length <= 32,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
    noSpaces: !/\s/.test(password) && password.length > 0,
    notName: userName && password.length > 0 ? !password.toLowerCase().includes(userName.toLowerCase()) : true,
    notEmail: userEmail && password.length > 0 ? !password.toLowerCase().includes(userEmail.toLowerCase().split('@')[0]) : true,
    notCommon: !['password', '12345678', 'qwerty123', 'admin123', 'careerbridge'].includes(password.toLowerCase())
  };

  const isBasicValid = result.length && result.uppercase && result.lowercase && result.number && result.specialChar && result.noSpaces && result.notCommon;
  const isFullyValid = isBasicValid && result.notName && result.notEmail;

  // Calculate strength score (0 to 5)
  let score = 0;
  if (password.length > 0) {
    if (result.length) score += 1;
    if (result.uppercase) score += 1;
    if (result.lowercase) score += 1;
    if (result.number) score += 1;
    if (result.specialChar) score += 1;
    
    // Penalize if it contains spaces or is common
    if (!result.noSpaces || !result.notCommon || !result.notName || !result.notEmail) {
      score = Math.max(0, score - 2);
    }
  }

  const getStrengthData = (s) => {
    switch (s) {
      case 0: return { label: 'Very Weak', color: 'bg-red-500', textClass: 'text-red-500' };
      case 1:
      case 2: return { label: 'Weak', color: 'bg-orange-500', textClass: 'text-orange-500' };
      case 3: return { label: 'Medium', color: 'bg-yellow-500', textClass: 'text-yellow-500' };
      case 4: return { label: 'Strong', color: 'bg-green-400', textClass: 'text-green-400' };
      case 5: return { label: 'Very Strong', color: 'bg-primary', textClass: 'text-primary' };
      default: return { label: 'Very Weak', color: 'bg-red-500', textClass: 'text-red-500' };
    }
  };

  const strengthData = getStrengthData(score);

  return {
    ...result,
    isValid: isFullyValid,
    score,
    strengthLabel: strengthData.label,
    strengthColor: strengthData.color,
    strengthTextClass: strengthData.textClass
  };
};
