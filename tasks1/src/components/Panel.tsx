import React, { useState } from "react";
import {
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import { ExpandMore, Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    panel: {
        backgroundColor: "#f0f0f0",
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius
    },
    button: {
        backgroundColor: "#3f51b5",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#1a237e",
        },
        "&:focus": {
            backgroundColor: "#1a237e",
        },
        "&:active": {
            backgroundColor: "#1a237e",
        },
        "&:disabled": {
            backgroundColor: "#c5c5c5",
        },
    },
    input: {
        marginBottom: theme.spacing(2),
    },
}));

const Panel = () => {
    const [expanded, setExpanded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Accordion expanded={expanded}>
                <AccordionSummary expandIcon={<ExpandMore />} onClick={handleExpand}>
                    <span>Personal data</span>
                </AccordionSummary>
                <AccordionDetails className={classes.panel}>
                    <form>
                        <TextField
                            className={classes.input}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            className={classes.input}
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            required
                        />
                        <TextField
                            className={classes.input}
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handlePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                placeholder: "Password",
                            }}
                        />
                        <Button className={classes.button} variant="contained" fullWidth>
                            Submit
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Panel;
