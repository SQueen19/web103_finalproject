import React from 'react'

const Login = (props) => {

    // Provide a simple guest login to avoid using GitHub OAuth.
    // If the app is later re-enabled for OAuth, the AUTH_URL can be used.
    const handleGuest = () => {
        if (props.onLogin) {
            // Minimal user object that other components expect. Use null id for guest
            // so server-side integer columns (user_id) accept null instead of a string.
            props.onLogin({ id: null, username: 'Guest' })
        } else {
            // Fallback: navigate to home
            window.location.href = '/'
        }
    }

    return (
        <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
            <div className='text-center space-y-8'>
                <h1 className='text-6xl mb-4'>TaskFlow ✈️</h1>
                <p className='text-gray-600 text-lg mb-8'>Manage your projects and tasks efficiently</p>
                <div>
                    <button onClick={handleGuest} className="px-8 py-4 bg-blue-600 text-white rounded-md text-lg">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
