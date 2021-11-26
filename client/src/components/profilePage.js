import React from 'react'
import Navbar from "./navbar";

export default function ProfilePage() {
    return (
        <div>
            <Navbar isLogin={true} />
            <h1 className='profilePage'>This is your profile</h1>
        </div>
    )
}
