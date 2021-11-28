import $ from "jquery";
import React from "react";
import {Autocomplete, Box, Button, Divider, Grid, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import * as config from "../config"

export default class FilterBox extends React.Component {
    static propTypes = {
        // The string representing the search query of the search page
        query: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            department: "",
            division: "",

            departmentList: [],
            divisionList: ["Lower division", "Upper division"],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        // Skip fetch data if we already have departments
        if (this.state.departmentList.length > 0) return;

        let url = config.baseUrl + config.api.course.getDepartments;
        $.post(url)
            .fail(() => {
                console.error("Failed to fetch departments.");
                this.setState({departmentList: ["Computer science", "Engineering"]});
            })
            .done((data) => {
                if (data.status === "failed") {
                    console.error("Failed to fetch departments.");
                } else {
                    this.setState({departmentList: data.departments});
                }
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        console.log(this.props.query)
        let url = "/search?";
        if (this.props.query) {
            console.log(this.props.query)
            url += `query=${encodeURIComponent(this.props.query)}&`;
        }
        if (this.state.department !== "") {
            url += `department=${encodeURIComponent(this.state.department)}&`;
        }
        if (this.state.division !== "") {
            url += `division=${encodeURIComponent(this.state.division)}&`;
        }
        window.location.href = url;
    }

    handleChange(field, newValue) {
        this.setState({[field]: newValue});
    }

    render() {
        return (
            <Box component="form"
                 onSubmit={this.handleSubmit}
                 width={"40%"}
                 sx={{
                     border: 1,
                     borderColor: 'grey.500',
                     mr: 5,
                     ml: 1,
                     height: "fit-content",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                 }}>
                <Typography variant="h5" sx={{mt: 1}} color="primary">
                    Filter
                </Typography>
                <Divider flexItem orientation="horizontal" sx={{mt: 1, mb: 3}}/>
                <Grid container alignItems="center" spacing={1} columns={15}>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <Typography variant="body1" sx={{textAlign: 'left'}}>
                            Department:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Autocomplete disablePortal
                                      fullWidth
                                      onChange={(e, v) => this.handleChange("department", v)}
                                      renderInput={(params) =>
                                          <TextField {...params} label="department"/>
                                      }
                                      options={this.state.departmentList}/>
                    </Grid>
                    <Grid item xs={1}/>

                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <Typography variant="body1" sx={{textAlign: 'left'}}>
                            Division:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Autocomplete disablePortal
                                      fullWidth
                                      onChange={(e, v) => this.handleChange("division", v)}
                                      renderInput={(params) =>
                                          <TextField {...params} label="division"/>
                                      }
                                      options={this.state.divisionList}/>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
                <Button type="submit"
                        variant="contained"
                        sx={{mt: 2, mb: 2}}>
                    Apply
                </Button>
            </Box>
        );
    }
}
