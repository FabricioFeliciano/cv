
import React, { ReactNode } from 'react';
import IconLink from '../IconLink';

import './index.scss';
import Button from '../Button';

interface ModalProps {
    visible: boolean,
    onClose: Function,
    title?: ReactNode,
    size?: "small" | "medium" | "large" | string,
    loading?: boolean,
    basic?: boolean,
    functions?: {
        label: ReactNode,
        context?: "success" | "danger" | "warning" | "grey" | "info",
        onClick: Function,
        disabled?: boolean,
        hidden?: boolean,
        tooltip?: string
    }[],
    children?: ReactNode,
}

const Modal: React.FC<ModalProps> = (props) => {

    const calcWidth = () => {

        if (!props.size)
            return "600px";

        switch (props.size) {
            case "sm":
                return "300px"
            case "medium":
                return "600px";
            case "lg":
                return "1200px"
            default:
                return props.size;
        }
    }

    return (
        <>
            {
                props.visible &&
                <div className={`modal${props.basic ? ' basic' : ''}`}>

                    <div className={`body`} style={{ width: calcWidth() }}>
                        {
                            props.title &&
                            <div className="header">
                                <div className="title">{props.title}</div>
                                <IconLink icon='icon icon-times' onClick={() => { props.onClose(false) }} />
                            </div>
                        }

                        <div className="content">
                            {
                                props.loading ?
                                    <div className='loading'>
                                        <i className="icon icon-loading icon-spin icon-7x text-link" />
                                    </div>
                                    :
                                    props.children
                            }
                        </div>
                        {
                            props.functions &&
                            <div className="functions">
                                {
                                    props.functions.map((f, i) => {
                                        return (
                                            <Button
                                                className={`button bg-${f.context || "info"}${f.hidden ? " hide" : ""}${f.disabled ? " disabled" : ""}`}
                                                onClick={() => { !f.disabled && f.onClick() }}
                                                label={f.label} />
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>

                </div>
            }
        </>
    );
}

export default Modal;