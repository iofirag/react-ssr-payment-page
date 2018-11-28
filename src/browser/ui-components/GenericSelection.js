import React, { Component } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { observer, inject } from "mobx-react";
import MenuItem from '@material-ui/core/MenuItem';

export const GenericSelection = React.memo(observer(props => {
    return (
        <NativeSelect
            value={props.value}
            onChange={props.onChangeHandler}
            inputProps={{ name: props.name }}>
            <option value="" />
            {
                props.list.map(obj => (
                    <option key={obj[props.listIdField]} value={obj[props.listValField]}>{obj[props.listLabelField]}</option>
                ))
            }
        </NativeSelect>
    )
}))