// Mock useAuth hook that returns empty/default values
export function useAuth() {
  return {
    user: { firstName: "User", lastName: "", email: "" },
    sessionToken: "mock-session-token",
    isAuthenticated: true,
    isLoading: false,
    error: null,
    login: () => Promise.resolve(),
    logout: () => {},
    exchangeAndVerifyIdToken: () => Promise.resolve()
  };
}