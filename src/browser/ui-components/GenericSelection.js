import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import { observer, inject } from "mobx-react";
import MenuItem from '@material-ui/core/MenuItem';

export const GenericSelection = React.memo(observer(props => {
    return (
        <Select
            value={props.value}
            onChange={props.onChangeHandler}
            inputProps={{ name: props.name }}>
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {
                props.list.map(obj => (
                    <MenuItem key={obj[props.listIdField]} value={obj[props.listValField]}>{obj[props.listLabelField]}</MenuItem>
                ))
            }
        </Select>
    )
}))