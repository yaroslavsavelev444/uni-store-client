import React from 'react';
import './UserPreview.css';

export default function UserPreview({ user }) {
  const hasAvatar = !!user?.avatar;

  return (
    <div className="user-preview">
      {hasAvatar ? (
        <img
          src={user.avatar}
          alt={user?.name || 'Аноним'}
          className="user-avatar"
        />
      ) : (
        <div className="user-avatar placeholder-avatar" />
      )}
      <div className="user-info">
        <div className="user-name">{user?.name || 'Аноним'}</div>
      </div>
    </div>
  );
}