import React from 'react'
import { API_URL } from '../../http/axios'
import Button from '../Buttons/Button'
import { X } from 'lucide-react'

export default function FileItem({ file, index, handleDeleteFile, isAdmin }) {
  return (
    <div>
      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <a
          href={`${API_URL}/uploads/${file.path.replace(/\\/g, "/")}`}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          {file.displayName || `файл ${index + 1}`}
        </a>
        {isAdmin && (
          <Button style={{ marginLeft: 10 }} onClick={() => handleDeleteFile(file.path)}>
            <X color="red" size={20} />
          </Button>
        )}
      </div>
    </div>
  )
}
