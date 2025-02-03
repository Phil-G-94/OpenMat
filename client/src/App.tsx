import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import QuestionForm from "./components/QuestionForm";
import Thread from "./components/Thread";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="auth/signup" element={<Signup />} />
                <Route path="auth/login" element={<Login />} />
                {/* */}
                <Route
                    path="questions"
                    element={<QuestionForm />}
                ></Route>
                <Route
                    path="questions/:questionId"
                    element={<Thread />}
                />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;

/* Removed temporarily - WIP

// import RequireAuth from "./pages/RequireAuth";
<Route
    path="questions"
    element={
        <RequireAuth>
            <QuestionForm />
        </RequireAuth>
    }
/>
*/
