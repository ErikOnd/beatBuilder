import {Dispatch, ReactNode, SetStateAction} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {MoodOptions} from "@/app/data/MoodOptions";
import Box from "@mui/material/Box";
import PromptNavigation from "@/app/components/PromptNavigation";
import HorizontalLinearStepper from "@/app/components/Stepper";
import useMediaQuery from '@mui/material/useMediaQuery';


type PromptCreatorProps = Readonly<{
    step: Dispatch<SetStateAction<number>>
    userPrompt: Dispatch<SetStateAction<string>>
}>

export default function PromptCreator({step, userPrompt}: PromptCreatorProps): ReactNode {

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box>
            <Autocomplete
                options={MoodOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Select a mood"/>}
            />
            {matches ? <HorizontalLinearStepper/> : <PromptNavigation step={step} userPrompt={userPrompt}/>}
        </Box>

    );
}
