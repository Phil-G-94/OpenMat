import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import QuestionForm from "./components/QuestionForm";
import RequireAuth from "./pages/RequireAuth";
// import RequireAuth from "./pages/RequireAuth";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="auth/signup" element={<Signup />} />
                <Route path="auth/login" element={<Login />} />
                <Route
                    path="questions"
                    element={
                        <RequireAuth>
                            <QuestionForm />
                        </RequireAuth>
                    }
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
