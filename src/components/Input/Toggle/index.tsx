import React from 'react';

import './index.scss';

interface PropsToggle {
    toggled: boolean,
    onChange?: Function,
    title?: string,
    leftTitle?: string,
    name?: string,
    disabled?: boolean
}

const Toggle: React.FC<PropsToggle> = (props) => {

    const handleCheck = () => {
        !props.disabled && props.onChange &&
            props.onChange({ target: { name: props.name, value: !props.toggled } });
    }

    return <div className={`toggle ${props.toggled ? 'toggled' : ''}`} onClick={handleCheck}>
        {
            props.leftTitle && <span className="title">{props.leftTitle}</span>
        }
        <div className="box">
        </div>
        {
            props.title && <span className="title">{props.title}</span>
        }
    </div>;
}

export default Toggle;