import { User } from "@/types";

export const useApi = () => {
  const baseUrlV1 = "https://csskluquckoiqiglgvpa.supabase.co/rest/v1";
  const authUrlV1 = "https://csskluquckoiqiglgvpa.supabase.co/auth/v1";
  const authHeaders = {
    "Content-Type": "application/json",
  };

  const getToken = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | undefined> => {
    try {
      const response = await fetch(`${authUrlV1}/token?grant_type=password`, {
        method: "POST",
        headers: {
          ...authHeaders,
        },
        body: JSON.stringify({
          email,
          password,
          gotrue_meta_security: {
            captcha_token: null,
          },
        }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getBudgetMonthlyLeftAmount = async ({
    userId,
    month,
  }: {
    userId: string;
    month: string;
  }) => {
    const response = await fetch(
      `${baseUrlV1}/BudgetMonthlyLeftAmount?select=%2A&userId=eq.${userId}&month=eq.${month}`,
      {
        headers: authHeaders,
      }
    );
    return response.json();
  };

  return {
    getBudgetMonthlyLeftAmount,
    getToken,
  };
};
