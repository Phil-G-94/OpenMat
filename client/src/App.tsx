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
import RequireAuth from "./pages/RequireAuth";
import MyQuestions from "./pages/MyQuestions";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="auth/signup" element={<Signup />} />
                <Route path="auth/login" element={<Login />} />
                <Route
                    path="myquestions"
                    element={
                        <RequireAuth>
                            <MyQuestions />
                        </RequireAuth>
                    }
                ></Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
