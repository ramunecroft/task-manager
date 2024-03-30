import "@testing-library/jest-dom";
jest.mock("next-auth/react", () => {
  const originalModule =
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    jest.requireActual<typeof import("next-auth/react")>("next-auth/react");

  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {username: "admin"},
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: "authenticated"}; // return type is [] in v3 but changed to {} in v4
    }),
  };
});
