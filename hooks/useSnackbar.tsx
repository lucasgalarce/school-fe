import { useState } from 'react'
import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material'

export const useSnackbar = (props?: SnackbarProps) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState<AlertColor>()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return {
        snackbar: (
            <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} {...props}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: '100%' }}
                    variant={'filled'}
                >
                    <p>{message}</p>
                </Alert>
            </Snackbar>
        ),
        handleOpenSnackbar: ({ message, type }: { message: string; type: AlertColor }) => {
            setMessage(message)
            setType(type)
            handleOpen()
        }
    }
}
