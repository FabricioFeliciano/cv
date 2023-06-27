import React, { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server'

import './index.scss';

interface Props {
    name?: string,
    value?: string | number
    options: { value: string | number, label: ReactNode, disabled?: boolean }[],
    onChange: Function,
    showFilter?: boolean,
    onFilter?: Function,
    required?: boolean,
    openTrigger?: "click" | "hover",
    title?: ReactNode,
    error?: { show: boolean, help: ReactNode },
    placeholder?: string,
    placeholderSearch?: string,
    top?: boolean,
    right?: boolean,
    width?: string | {
        sm: string,
        md: string,
        lg: string
    }
    disabled?: boolean,
    readOnly?: boolean,
    closeDelay?: number
}

const DropDown: React.FC<Props> = (props) => {

    const [listVisible, setListVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [filter, setFilter] = useState('');
    const [listTop, setListTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(props.top);

    const changeVisibility = (value: boolean) => {
        (!props.disabled && !props.readOnly) &&
            setListVisible(value);
    }

    const onChange = (event: any) => {
        (!props.disabled && !props.readOnly) &&
            props.onChange(event);
    }

    useEffect(() => {
        props.onFilter && (!props.disabled && !props.readOnly) &&
            props.onFilter(filter);
    }, [filter])

    const getItemsSize = () => {

        let length = props.options.length;
        let filterSize = props.showFilter ? 32 : 0;

        let val = !listVisible
            ?
            0
            :
            (
                length >= 6
                    ?
                    filterSize + (32 * 6) + 1
                    :
                    filterSize + (length * 32) + 1
            );
        return val;
    }

    const [fieldWidth, setFieldWidth] = useState('');
    const calcWidth = () => {
        let _width = fieldWidth;
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
        setFieldWidth(_width);
    }
    useEffect(() => {
        calcWidth();
        window.removeEventListener('resize', calcWidth);
        return () => {
            window.removeEventListener('resize', calcWidth);
        }
    }, [])
    const onScroll = (event: any) => {
        event.target.id !== 'items' &&
            setListVisible(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll, true);
        //window.addEventListener('resize', onScroll, true);
        //window.addEventListener('touchmove', onScroll, true);
        return () => {
            window.removeEventListener('scroll', onScroll, true);
            //window.removeEventListener('resize', onScroll, true);
            //window.removeEventListener('touchmove', onScroll, true);
        }
    }, [])

    //Delay close 
    var timerVisibility: any;
    const onMouseLeave = () => {
        clearTimeout(timerVisibility);
        timerVisibility = setTimeout(() => changeVisibility(false), props.closeDelay || 250);
    }

    const calcBottomLimit = (length: number) => {
        setTop(getItemsSize() > length);
    }

    return (
        <div className={`dropdown${props.disabled ? " disabled" : ""}${props.readOnly ? " readonly" : ""} ${fieldWidth}`}
            ref={(ref: any) => {
                if (ref) {
                    calcBottomLimit(window.innerHeight - ref.getClientRects()[0].bottom);
                    setListTop(ref.getClientRects()[0].top + (props.title ? (!top ? 59 : 21) : (!top ? 40 : 0)))
                }
            }}
            onMouseOver={() => {
                (props.openTrigger === "hover" && !props.error?.show) &&
                    changeVisibility(true);
                clearTimeout(timerVisibility);
            }}
            onMouseLeave={() => { onMouseLeave(); setFilter(""); }}
            onClick={(event: any) => {
                event.target.id === 'field' &&
                    changeVisibility(!listVisible);
            }}
        >

            {
                props.title &&
                <div className="title">{props.title}</div>
            }

            <div
                id="field"
                className={`field${(!props.disabled && !props.readOnly) && props.required ? ' required' : ''}${props.error?.show ? ' error' : ''}${listVisible ? " active" : ""}${top ? ' top' : ''}`}
                ref={(ref: any) => {
                    if (ref) {
                        setWidth(ref.offsetWidth || 0);
                    }
                }}
                onMouseOver={(event: any) => {
                    setTooltipVisible(true);

                    if (event && event.target) {
                        let _rect = event.target.getClientRects();

                        //Calc bottom limit
                        let xtop = window.innerHeight - _rect[0].bottom < 80;
                    }
                }}
                onMouseLeave={() => {
                    setTooltipVisible(false);
                }}
            >

                <span className="value" onClick={() => changeVisibility(!listVisible)}>
                    {
                        props.placeholder && (!props.value || props.value.toString().length === 0) &&
                        <span className="placeholder">{props.placeholder}</span>
                    }
                    {
                        props.options.find(o => o.value === props.value)?.label
                    }
                </span>

                <div className="icons">
                    {
                        !(props.required || props.readOnly || props.disabled) &&
                        <i className="icon icon-x" onClick={() => onChange({ target: { name: props.name, value: "" } })} />
                    }
                    <i className={`icon icon-angle-${listVisible ? "up" : "down"}`} onClick={() => (!props.disabled || !props.readOnly) && changeVisibility(!listVisible)} />
                </div>
            </div>


            <div className={`list${props.right ? ' right' : ''}${top ? ' top' : ''}`}
                style={{ top: listTop, width: width }}>

                <div className="body"
                    style={{
                        height: getItemsSize() + 'px',
                        maxHeight: props.showFilter ? (32 * 7) : (32 * 6),
                        opacity: listVisible ? 1 : 0,
                        overflow: listVisible ? 'unset' : 'hidden'
                    }}
                >

                    {
                        props.showFilter &&
                        <div className="search">
                            <i className="icon icon-search icon-2x text-grey" />
                            <input type="text"
                                value={filter}
                                onChange={event => {
                                    changeVisibility(true);
                                    setFilter(event.target.value)
                                }}
                                placeholder={props.placeholderSearch}
                                autoComplete="off"
                                onClick={() => { props.openTrigger === "click" && changeVisibility(true) }}
                            />
                            <i className="icon icon-times icon-1x link" onClick={() => setFilter("")} />
                        </div>
                    }

                    <div className="items scroll" id="items"
                        style={{ height: props.showFilter ? "calc(100% - 32px)" : "calc(100%)" }}
                    >
                        {
                            props.options
                                .filter(o => {
                                    let _label = ReactDOMServer.renderToString(o.label as any).toLowerCase();
                                    _label = _label.replaceAll(/<(\S*?)[^>]>.?<\1>|<.*?>/g, "");
                                    return (o.label && _label.indexOf(filter.toLowerCase()) >= 0) || props.onFilter
                                })
                                .map((o, i) => {
                                    return <div
                                        key={i}
                                        className={`item${o.disabled ? ' disabled' : ''}${o.value === props.value ? " selected" : ""}`}
                                        onClick={() => {
                                            if (!o.disabled) {
                                                onChange({ target: { name: props.name, value: o.value } });
                                                changeVisibility(false);
                                            }
                                        }}
                                    >
                                        {o.label}
                                    </div>
                                })
                        }

                    </div>
                </div>
            </div>

            {
                props.error && props.error.show && !listVisible &&
                <div
                    className={`help${props.right ? ' right' : ''}${top ? ' top' : ''}`}
                    style={{
                        top: listTop,
                        opacity: tooltipVisible ? 1 : 0
                    }} >
                    <div className="content">
                        {props.error.help}
                    </div>
                </div>
            }
        </div >
    );
}

export default DropDown;