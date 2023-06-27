import React, { ReactNode, TextareaHTMLAttributes, useEffect, useState } from 'react';
import IconLink from '../../Elements/IconLink';

import './index.scss';

export interface TextAreaProps extends TextareaHTMLAttributes<any> {
    width?: string | {
        sm: string,
        md: string,
        lg: string
    },
    error?: { show: boolean, help: ReactNode },
    decoration?: ReactNode,
    functions?: { icon: string, tooltip: string, onClick: Function, disabled?: boolean }[],
    autoheight?: boolean
}

const TextArea: React.FC<TextAreaProps> = (_props) => {

    const { width, error, decoration, functions, autoheight, title, ...props } = _props;

    const [active, setActive] = useState(false);
    const [height, setHeight] = useState(props.rows || "auto");

    const onChange = (event: any) => {
        (!props.disabled && !props.readOnly) && props.onChange &&
            props.onChange(event);
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
        <div className={`textarea${props.disabled ? " disabled" : ""}${props.readOnly ? " readonly" : ""} ${fieldWidth}`}>

            {
                title &&
                <div className="title">{title}</div>
            }

            <div className={`field${(!props.disabled && !props.readOnly) && props.required ? ' required' : ''}${error?.show ? ' error' : ''}${active ? " active" : ""}`}
                style={{ height: height }}
            >

                {
                    decoration &&
                    <div className="decoration">
                        {decoration}
                    </div>
                }

                <textarea
                    {...props}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    className="value scroll-v"
                    onInput={(event: any) => {
                        autoheight &&
                            setHeight(event.target.scrollHeight + 18)
                    }}
                />
                {
                    <div className="icons">
                        {
                            !(props.required || props.readOnly || props.disabled) && props.value &&
                            <i className="icon icon-times" onClick={() => (!props.disabled || !props.readOnly) && onChange({ target: { name: props.name, value: "" } })} />
                        }
                        {
                            functions?.map((f, i) => {
                                return <IconLink key={i} size="small" icon={f.icon} tooltip={{ content: f.tooltip }} onClick={f.onClick} disabled={f.disabled || props.disabled || props.readOnly} />
                            })
                        }
                    </div>
                }
            </div>

            {
                error?.show && error.help !== undefined &&
                <div className="tooltip left">
                    <div className="content">
                        {error.help}
                    </div>
                </div>
            }
        </div>
    );
}

export default TextArea;