import React from 'react'

const Login = (props) => {

    const AUTH_URL = `${props.api_url}/auth/github`

    return (
        <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
            <div className='text-center space-y-8'>
                <h1 className='text-6xl mb-4'>TaskFlow ✈️</h1>
                <p className='text-gray-600 text-lg mb-8'>Manage your projects and tasks efficiently</p>
                <center>
                    <a href={AUTH_URL}>
                        <button className="px-8 py-4 bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700 flex items-center gap-3 text-lg">
                            🔒 Login via Github
                        </button>
                    </a>
                </center>
            </div>
        </div>
    )
}

export default Login
