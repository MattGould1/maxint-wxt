export type User = {
  access_token: string;
  expires_at: number; // 1737520123;
  expires_in: number; // 3600;
  refresh_token: string; // "8IhmUVwk7HJEhOD0vX7-Iw";
  token_type: string; // "bearer";
  user: {
    app_metadata: {
      provider: string; // "email";
      providers: string[]; // ["email"]
    };
    aud: string; // "authenticated";
    confirmed_at: string; // "2024-03-22T17:45:47.899098Z";
    created_at: string; // "2024-03-22T17:45:47.889222Z";
    email: string; // "test@maxint.com";
    email_confirmed_at: string; // "2024-03-22T17:45:47.899098Z";
    id: string; // "d45a4968-dea9-4318-8440-ab90839bc125";
    identities: {
      created_at: string; // "2024-03-22T17:45:47.895316Z";
      email: string; // "test@maxint.com";
      id: string; // "d45a4968-dea9-4318-8440-ab90839bc125";
      identity_data: {
        email: string; // "test@maxint.com";
        email_verified: boolean; // false;
        phone_verified: boolean; // false;
        sub: string; // "d45a4968-dea9-4318-8440-ab90839bc125";
      };
      identity_id: string; // "053dfee9-ecb2-4bc3-8cff-84710376f4a3";
      last_sign_in_at: string; // "2024-03-22T17:45:47.895252Z";
      provider: string; // "email";
      updated_at: string; // "2024-03-22T17:45:47.895316Z";
      user_id: string; // "d45a4968-dea9-4318-8440-ab90839bc125";
    }[];
    is_anonymous: boolean; // false;
    last_sign_in_at: string; // "2025-01-22T03:28:43.111227568Z";
    phone: string; // "";
    recovery_sent_at: string; // "2024-03-25T21:40:09.632032Z";
    role: string; // "authenticated";
    updated_at: string; // "2025-01-22T03:28:43.113772Z";
    user_metadata: {};
  };
};

export type BudgetMonthlyLeftAmount = {
  userId: string; // "d45a4968-dea9-4318-8440-ab90839bc125";
  month: string; // "2025-01-01T00:00:00";
  totalExpense: number; // 935.16;
  medianMonthlyExpense: number; // 5048.70947265625;
  leftAmount: number; // 4113.54943847656;
};

export type Deposit = {
  id: string; // "b1617a5d-7aaa-4d9d-b661-101d73d77e46";
  createdAt: string; // "2024-11-06T11:16:14.888";
  bankName: string; // "Together Credit Union (MO)";
  estimatedEarning: number; // 0;
  imageUrl: string | null; // null;
  imageExternalUrl: string; // "https://csskluquckoiqiglgvpa.supabase.co/storage/v1/object/public/offers/deposits/together-credit-union-mo.png";
  maxAPY: number; // 0;
  offerAPY: number; // 5;
  offerCategory: string; // "checking";
  offerName: string; // "Empower Checking";
  website: string; // "https://www.togethercu.org/";
  zip: string; // "63118";
  targetCustomer: string; // "personal";
  minimumDeposit: number; // 0;
  imageDarkColor: string; // "#103c70";
  imageLightColor: string; // "#c7ea77";
  insurers: string; // "NCUA-62715";
  slug: string; // "empower-checking-together-credit-union-mo";
};
