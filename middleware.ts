import { withAuth } from "next-auth/middleware";

export default withAuth(
  (req) => {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true;
      },
    },
  },
);
