import {Dispatch, ReactNode, SetStateAction} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";

type PromptNavigationProps = Readonly<{
    step: Dispatch<SetStateAction<number>>
    userPrompt: Dispatch<SetStateAction<string>>
}>

export default function PromptNavigation({step, userPrompt}: PromptNavigationProps): ReactNode {

    return (
        <Box display="flex" width="100%" justifyContent="center" marginTop="100px">
            <ButtonGroup variant="outlined">
                <Button><ArrowBackIosIcon fontSize="large"/></Button>
                <Button><ArrowForwardIosIcon fontSize="large"/></Button>
            </ButtonGroup>
        </Box>
    )

}