import React, { ReactNode, useEffect, useState } from 'react';

import './index.scss';

interface TooltipProps {
    content: ReactNode,
    top?: boolean,
    position?: 'left' | 'center' | 'right'
}

const Tooltip: React.FC<TooltipProps> = (props) => {

    const [position, setPosition] = useState(props.position || 'left');
    const [top, setTop] = useState(props.top);
    const [visible, setVisible] = useState(false);
    const [rect, setRect] = useState({
        top: 0,
        width: 0,
        height: 0
    })

    const onScrollOrResize = () => {
        setPosition(props.position || 'left');
        setTop(props.top);
        setVisible(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', onScrollOrResize, true);
        window.addEventListener('resize', onScrollOrResize, true);
        return () => {
            window.removeEventListener('scroll', onScrollOrResize, true);
            window.removeEventListener('resize', onScrollOrResize, true);
        }
    }, [])

    return <div
        className="c-tooltip"


        onMouseOver={(event: any) => {
            setVisible(true);
            if (event && event.target) {
                let _rect = event.target.getClientRects();
                setRect({
                    top: _rect[0].top,
                    width: event.target.offsetWidth || 0,
                    height: event.target.offsetHeight || 0
                })

                //Calc bottom limit
                !top &&
                    setTop(window.innerHeight - _rect[0].bottom < 80)

                //Calc right limit
                position === 'left' && (window.innerWidth - _rect[0].right) < 230 &&
                    setPosition('right');
                position === 'center' && (window.innerWidth - _rect[0].right) < 115 &&
                    setPosition('right');

                //Calc left limit
                position === 'right' && _rect[0].left < 230 &&
                    setPosition('left');
                position === 'center' && _rect[0].left < 115 &&
                    setPosition('left');

            }
        }}
        onMouseLeave={(event: any) => {
            setVisible(false);
        }}
    >
        {props.children}
        <div
            className={`body ${position || 'center'} ${top ? 'top' : ''}`}
            style={{
                top: top ? rect.top : rect.top + rect.height,
                width: rect.width,
                opacity: visible ? 1 : 0,
                transition: visible ? 'opacity 0.25s linear' : 'none'
            }}
        >
            <div className="content">{props.content}</div>
        </div>
    </div>;
}

export default Tooltip;