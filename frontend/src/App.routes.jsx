import { createBrowserRouter } from "react-router";
import Dashborad from "./features/Forge/pages/Dashborad";
import SandboxUi from "./features/Forge/pages/sandboxUi";

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Dashborad/>
    },
    {
        path:'/SandboxUi',
        element:<SandboxUi/>
    }
])

