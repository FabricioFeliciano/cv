import React, { ReactNode, useEffect, useState } from 'react';

import './index.scss';

interface PropsButton {
    onClick: Function
    loading?: boolean
    className?: string
    disabled?: boolean
    label?: ReactNode
    width?: string | {
        sm: string,
        md: string,
        lg: string
    }
}

const Button: React.FC<PropsButton> = (props) => {

    const [width, setWidth] = useState('');
    const calcWidth = () => {
        let _width = width;
        switch (typeof props.width) {
            case 'string':
                _width = props.width;
                break;
            case 'object':
                if (window.innerWidth > 1200)
                    _width = props.width.lg;
                else if (window.innerWidth > 768)
                    _width = props.width.md;
                else
                    _width = props.width.sm;
                break;
        }
        setWidth(_width);
    }

    useEffect(() => {
        calcWidth();
        window.addEventListener('resize', calcWidth);
        return () => {
            window.removeEventListener('resize', calcWidth);
        }
    }, [])

    return <button type='button' className={`button ${props.className || ''} ${width}`} onClick={event => { !props.disabled && props.onClick(event) }}>

        {
            !props.loading
                ?
                (props.label || props.children)
                :
                <i className='icon icon-circle-notch icon-spin' />
        }
    </button>;
}

export default Button;