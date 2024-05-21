import { useState } from 'react';
import  Dialog  from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
/*import DialogContent from '@mui/material/DialogContent';*/
import DialogTitle from '@mui/material/DialogTitle';
import { Car }  from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi';
import CarDialogContent from './CarDialogContent';
import Button from '@mui/material/Button';
function AddCar() {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price:0
    });
    const handleClickOpen = () => {
        setOpen(true);
    }
    

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        mutate(car);
        setCar({ brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0 });
        handleClose();
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }
    return (
        <>
            <Button onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange } />
                <DialogAction>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogAction>
            </Dialog>
        </>
    );
}
export default AddCar;