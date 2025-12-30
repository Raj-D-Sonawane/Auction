import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { getCurrentUser } from "./features/auth/authSlice"
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);

  return <AppRoutes />
}

export default App
