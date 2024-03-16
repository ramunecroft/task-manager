import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  // Mock the task list
  queryClient.setQueryData(
    ["taskList"],
    [
      {
        description: "Test Task",
        ticketCode: "TST-01",
        voteCount: 3,
        status: "TODO",
      },
    ]
  );
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
};
