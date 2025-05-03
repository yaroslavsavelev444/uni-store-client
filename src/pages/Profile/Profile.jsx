import React from 'react'
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock'

export default function Profile() {
  const handleOpenSettingsModal = () => {
    console.log("Open settings modal");
  }
  return (
    <div>
     <ProfileBlock handleOpenSettingsModal={handleOpenSettingsModal}/>
    </div>
  )
}
