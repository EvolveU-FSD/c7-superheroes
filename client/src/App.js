import { Routes, Route } from 'react-router-dom'

import SuperheroListPage from './pages/SuperheroListPage'
import CreateSuperheroPage from './pages/CreateSuperheroPage'
import SuperheroDetailPage from './pages/SuperheroDetailPage'
import LoginPage from './pages/LoginPage'

import './App.css'
import SuperheroEditPage from './pages/SuperheroEditPage'
import AuthenticationProvider from './AuthenticationProvider'
import Nav from './components/Nav'

function App() {
    return (
        <AuthenticationProvider>
            <div className="App">
                <Nav />
                <Routes>
                    <Route path="/" element={<SuperheroListPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/new" element={<CreateSuperheroPage />} />
                    <Route
                        path="/superhero/:id"
                        element={<SuperheroDetailPage />}
                    />
                    <Route
                        path="/superhero/:id/edit"
                        element={<SuperheroEditPage />}
                    />
                </Routes>
            </div>
        </AuthenticationProvider>
    )
}

export default App
