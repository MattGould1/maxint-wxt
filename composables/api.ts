import { Deposit, User } from "@/types";

type APIOptions = {
  accessToken: string;
};

export const useApi = () => {
  const baseUrlV1 = "https://csskluquckoiqiglgvpa.supabase.co/rest/v1";
  const authUrlV1 = "https://csskluquckoiqiglgvpa.supabase.co/auth/v1";

  const authHeaders = (accessToken?: string) => {
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (accessToken != null) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
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
          ...authHeaders(),
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

  const getBudgetMonthlyLeftAmount = async (
    {
      userId,
      month,
    }: {
      userId: string;
      month: string;
    },
    { accessToken }: APIOptions
  ) => {
    const response = await fetch(
      `${baseUrlV1}/BudgetMonthlyLeftAmount?select=%2A&userId=eq.${userId}&month=eq.${month}`,
      {
        headers: authHeaders(accessToken),
      }
    );
    return response.json();
  };

  const getDeposits = async (
    {
      offerCategory,
      offset,
      select,
      order,
      limit,
    }: {
      offerCategory: string;
      offset: number;
      limit: number;
      order: string;
      select: string;
    },
    { accessToken }: APIOptions
  ): Promise<Deposit[]> => {
    const params = new URLSearchParams();
    params.set("offerCategory", offerCategory);
    params.set("offset", offset.toString());
    params.set("limit", limit.toString());
    params.set("order", order);
    params.set("select", select);

    const response = await fetch(`${baseUrlV1}/Deposit?${params.toString()}`, {
      headers: authHeaders(accessToken),
    });
    return await response.json();
  };

  return {
    getBudgetMonthlyLeftAmount,
    getDeposits,
    getToken,
  };
};
