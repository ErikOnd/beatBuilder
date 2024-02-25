import React from 'react';
import {ButtonProps, Typography, TypographyProps} from '@mui/material';
import Button from "@mui/material/Button";

interface CustomTypographyProps extends TypographyProps {
    children: React.ReactNode;
}

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode;
}


export const CustomTypography = ({ children, ...rest }: CustomTypographyProps) => (
    <Typography
        variant="h2"
        sx={{textAlign: "center" }}
        {...rest}
    >
        {children}
    </Typography>
);




export const CustomButton = ({ children, ...rest }: CustomButtonProps) => (
    <Button
        variant="contained"
        {...rest}
    >
        {children}
    </Button>
);
