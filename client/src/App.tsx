import {
    // Route,
    createBrowserRouter,
    // createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import QuestionForm from "./components/QuestionForm";
import Thread from "./components/Thread";
import RequireAuth from "./pages/RequireAuth";
import ErrorPage from "./pages/ErrorPage";

function App() {
    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         <Route
    //             path="/"
    //             element={<RootLayout />}
    //             errorElement={<ErrorPage />}
    //         >
    //             <Route index element={<HomePage />} />
    //             <Route path="auth/signup" element={<Signup />} />
    //             <Route path="auth/login" element={<Login />} />
    //             <Route element={<RequireAuth />}>
    //                 <Route
    //                     path="questions"
    //                     element={<QuestionForm />}
    //                 ></Route>
    //                 <Route
    //                     path="questions/:questionId"
    //                     element={<Thread />}
    //                 />
    //             </Route>
    //         </Route>
    //     )
    // );

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                { path: "auth/signup", element: <Signup /> },
                { path: "auth/login", element: <Login /> },
                {
                    element: <RequireAuth />,
                    children: [
                        {
                            path: "questions",
                            element: <QuestionForm />,
                        },
                        {
                            path: "questions/:questionId",
                            element: <Thread />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
