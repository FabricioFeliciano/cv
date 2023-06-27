import React, { ReactNode, createRef, useEffect, useRef, useState } from 'react';
import './index.scss';

interface Props {
    icon?: string,
    color?: string,
    onClick?: Function,
    disabled?: boolean,
    tooltip?: {
        content: ReactNode,
        position?: 'left' | 'right'
    },
    badge?: {
        number: number,
        context: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'grey'
    },
    size?: 'small' | 'medium' | 'big'
}

const IconLink: React.FC<Props> = (props) => {

    const disabled = props.disabled || false;

    const [tooltipTop, setTooltipTop] = useState(0);

    const handleRef = (event: any) => {
        if (props.tooltip && event && event.target) {
            setTooltipTop(event.target.getClientRects()[0].top! || 0)
        }
    }

    return (
        <div
            className={`iconlink${props.disabled ? ' disabled' : ''} ${props.size || ''}`}
            onClick={() => !disabled && props.onClick && props.onClick()}
            onMouseOver={handleRef}
        >
            <div className="content">
                <i className={props.icon} style={{ color: props.color }} />
                {
                    props.badge && props.badge.number > 0 &&
                    <div className={`badge bg-${props.badge.context}`}>
                        <span>{props.badge.number > 99 ? '+99' : props.badge.number}</span>
                    </div>
                }
            </div>
            {
                props.tooltip &&
                <div className={`tooltip ${props.tooltip.position || ''}`} style={{ top: tooltipTop }}>
                    <div className="content">
                        {props.tooltip.content}
                    </div>
                </div>
            }
        </div>
    );
}

export default IconLink;