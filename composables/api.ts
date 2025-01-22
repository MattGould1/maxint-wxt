import { User } from "@/types";

export const useApi = () => {
  // https://csskluquckoiqiglgvpa.supabase.co/rest/v1/BudgetMonthlyLeftAmount?select=%2A&userId=eq.d45a4968-dea9-4318-8440-ab90839bc125&month=eq.2025-01-01

  const baseUrlV1 = "https://csskluquckoiqiglgvpa.supabase.co/rest/v1";
  const authHeaders = {
    "Content-Type": "application/json",
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc2tsdXF1Y2tvaXFpZ2xndnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NzM3NzIsImV4cCI6MjAyNjA0OTc3Mn0.HBs_tVdMQmbBt9ZoxqgoD-EZx-XIrej1BmQFSR169O0",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc2tsdXF1Y2tvaXFpZ2xndnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NzM3NzIsImV4cCI6MjAyNjA0OTc3Mn0.HBs_tVdMQmbBt9ZoxqgoD-EZx-XIrej1BmQFSR169O0",
  };

  const getToken = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | undefined> => {
    try {
      const response = await fetch(`${baseUrlV1}/token?grant_type=password`, {
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
      return await response.json();
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
