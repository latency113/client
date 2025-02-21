export const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode payload จาก token
      return decoded;
    } catch (error) {
      console.error("ไม่สามารถถอดรหัส Token:", error);
      return null;
    }
  };
  