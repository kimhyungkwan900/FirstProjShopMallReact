// src/routes/UserRouter.jsx
import { Suspense, lazy } from "react";

const UserFaqPage = lazy(() => 
    import("../../../pages/user/userFaq/UserFaqPage")
);

const UserRouter = [
  {
    path: "faq",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserFaqPage />
      </Suspense>
    ),
  },
];

export default UserRouter;
