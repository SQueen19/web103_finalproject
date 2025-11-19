import React from 'react'

const Avatar = (props) =>  {
    return (
        <div className='inline-block'>
            <img 
                className='w-10 h-10 rounded-full object-cover border-2 border-gray-600' 
                src={props.user.avatarurl} 
                alt={props.user.username}
            />
        </div>
    )
}

export default Avatar
