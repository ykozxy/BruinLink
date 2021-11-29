import React from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";

export default class SearchBar extends React.Component {
    static propTypes = {
        initialQuery: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {query: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value})
    }

    handleKeyPress(event) {
        if (event.charCode === 13) {
            window.location.href = `/search?query=${encodeURIComponent(this.state.query)}`
        }
    }

    render() {
        return (
            <Box bgcolor="rgb(232, 241, 250)">
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="search"
                    value={this.props.initialQuery}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        );
    }
}
  