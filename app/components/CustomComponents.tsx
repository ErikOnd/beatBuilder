import React from 'react';
import {ButtonProps, Typography, TypographyProps} from '@mui/material';
import Button from "@mui/material/Button";

interface CustomTypographyProps extends TypographyProps {
    children: React.ReactNode;
}

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode;
}




export const LargeButton = ({ children, ...rest }: CustomButtonProps) => (
    <>
        <Button
            variant="contained"
            sx={{
                fontWeight: 'bold',
                padding: {
                    xs: '5px 10px',
                    sm: '10px 20px',
                    md: '15px 30px',
                    lg: '20px 40px',
                    xl: '25px 50px'
                },
                fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '3rem',
                    xl: '4rem'
                },
            }}
            {...rest}
        >
            {children}
        </Button>
    </>

);
