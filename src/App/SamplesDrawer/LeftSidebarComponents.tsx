import React from 'react'
import { Box } from '@mui/material'
import { CustomComponents } from './customComponents'
import CustomBlockButton from '../../documents/blocks/helpers/EditorChildrenIds/AddBlockMenu/CustomBlockButton'

const LeftSidebarComponents = () => {
    const handleOnDrag = (ev: React.DragEvent, data: any) => {
        ev.dataTransfer.setData("text", JSON.stringify(data))
    }
    return (
        <Box sx={{ p: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {CustomComponents.map((k, i) => (
                <div key={i} onDragStart={(ev) => handleOnDrag(ev, k.block())} draggable={true}>
                    <CustomBlockButton label={k.label} icon={k.icon} />
                </div>
            ))}
        </Box>
    )
}

export default LeftSidebarComponents