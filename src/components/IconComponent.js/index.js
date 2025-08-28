import React from 'react';
import Icon from 'react-native-vector-icons/Feather'

const IconComponent = ({
    name,
    size,
    color
}) => {
    return (
        <Icon name={name} size={size} color={color} />
    )
}

export default IconComponent