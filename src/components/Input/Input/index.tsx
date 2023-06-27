import React, { InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';

import './index.scss';
import IconLink from '../../Elements/IconLink';

export interface InputProps extends Omit<InputHTMLAttributes<any>, 'width'> {
    type?: 'text' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'file',
    error?: { show: boolean, help: ReactNode },
    decoration?: ReactNode,
    functions?: { icon: string, tooltip: string, onClick: Function, disabled?: boolean }[],
    width?: string | {
        sm: string,
        md: string,
        lg: string
    }
}

const Input: React.FC<InputProps> = (_props) => {

    const { error, decoration, functions, width, title, ...props } = _props;

    const [tooltipTop, setTooltipTop] = useState(0);

    const handleRef = (event: any) => {
        if (error && event && event.target && event.target.className.includes('field')) {
            setTooltipTop(event.target.getClientRects()[0].top! || 0)
        }
    }

    const [fieldWidth, setFieldWidth] = useState('');
    const calcWidth = () => {
        let _width = fieldWidth;
        switch (typeof width) {
            case 'string':
                _width = width;
                break;
            case 'object':
                if (window.innerWidth > 1200)
                    _width = width.lg;
                else if (window.innerWidth > 768)
                    _width = width.md;
                else
                    _width = width.sm;
                break;
        }
        setFieldWidth(_width);
    }
    useEffect(() => {
        calcWidth();
        window.addEventListener('resize', calcWidth);
        return () => {
            window.removeEventListener('resize', calcWidth);
        }
    }, [])

    return (
        <div
            className={`input${props.disabled ? " disabled" : ""}${props.readOnly ? " readonly" : ""} ${fieldWidth}`}
            onMouseOver={handleRef}
        >
            {
                title &&
                <div className="title">{title}</div>
            }

            <div className={`field${(!props.disabled && !props.readOnly) && props.required ? ' required' : ''}${error?.show ? ' error' : ''}`}>

                {
                    decoration &&
                    <div className="decoration">
                        {decoration}
                    </div>
                }

                <input
                    {...props}
                    className="value"
                    type={props.type}
                />

                <div className="icons">
                    {
                        functions?.map((f, i) => {
                            return <IconLink key={i}
                                size="small"
                                icon={f.icon}
                                tooltip={{ content: f.tooltip as any }}
                                onClick={f.onClick}
                                disabled={f.disabled || props.disabled || props.readOnly} />
                        })
                    }
                </div>

            </div>
            {
                error?.show && error.help !== undefined &&
                <div className="tooltip left" style={{ top: tooltipTop }}>
                    <div className="content">
                        {error.help}
                    </div>
                </div>
            }
        </div>
    );
}

export default Input;